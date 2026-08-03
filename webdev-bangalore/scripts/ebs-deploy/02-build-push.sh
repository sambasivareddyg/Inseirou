#!/usr/bin/env bash
# =============================================================================
#  02-build-push.sh
#  Builds Docker images for every service and pushes them to Amazon ECR.
#
#  Usage:
#    bash 02-build-push.sh                  # build + push all
#    bash 02-build-push.sh user-service     # build + push one service only
# =============================================================================

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/config.sh"

R='\033[0;31m'; G='\033[0;32m'; C='\033[0;36m'; B='\033[1m'; N='\033[0m'
ok()   { echo -e "${G}[OK]${N}   $*"; }
err()  { echo -e "${R}[ERR]${N}  $*"; exit 1; }
info() { echo -e "${C}[INFO]${N} $*"; }
step() { echo -e "\n${B}===> $*${N}"; }

TARGET_ONLY="${1:-all}"

# ── Resolve project root ──────────────────────────────────────────────────────
PROJECT_ABS="$(cd "$SCRIPT_DIR/$PROJECT_ROOT" && pwd)"
[[ -f "$PROJECT_ABS/docker-compose.yml" ]] || err "Project root not found at $PROJECT_ABS. Check PROJECT_ROOT in config.sh"

# ── ECR login ─────────────────────────────────────────────────────────────────
step "Logging in to ECR ($ECR_REGISTRY)"
aws ecr get-login-password --region "$AWS_REGION" | \
  docker login --username AWS --password-stdin "$ECR_REGISTRY"
ok "ECR login successful."

# ── Helper: ensure ECR repo exists ────────────────────────────────────────────
ensure_repo() {
  local repo="$1"
  aws ecr describe-repositories \
    --repository-names "$repo" \
    --region "$AWS_REGION" &>/dev/null || \
  aws ecr create-repository \
    --repository-name "$repo" \
    --region "$AWS_REGION" \
    --image-scanning-configuration scanOnPush=true \
    --encryption-configuration encryptionType=AES256 \
    --query "repository.repositoryUri" \
    --output text
}

# ── Helper: build + push one image ───────────────────────────────────────────
build_push() {
  local svc="$1"        # e.g. user-service
  local ctx="$2"        # build context path
  local repo="${APP_NAME}/${svc}"
  local image="${ECR_REGISTRY}/${repo}:${IMAGE_TAG}"

  step "Building $svc"
  ensure_repo "$repo"
  info "Context : $ctx"
  info "Image   : $image"

  docker build \
    --platform linux/amd64 \
    --build-arg BUILDKIT_INLINE_CACHE=1 \
    --cache-from "$image" \
    -t "$image" \
    "$ctx"

  info "Pushing $image..."
  docker push "$image"
  ok "$svc pushed to ECR."
}

# ── Build services ────────────────────────────────────────────────────────────
ALL_SERVICES=(
  "eureka-server:$PROJECT_ABS/backend/eureka-server"
  "api-gateway:$PROJECT_ABS/backend/api-gateway"
  "user-service:$PROJECT_ABS/backend/user-service"
  "contact-service:$PROJECT_ABS/backend/contact-service"
  "project-service:$PROJECT_ABS/backend/project-service"
  "audit-service:$PROJECT_ABS/backend/audit-service"
  "frontend:$PROJECT_ABS/frontend"
)

BUILT=0
for entry in "${ALL_SERVICES[@]}"; do
  svc="${entry%%:*}"
  ctx="${entry#*:}"

  # Filter if a specific service was requested
  if [[ "$TARGET_ONLY" != "all" && "$TARGET_ONLY" != "$svc" ]]; then
    continue
  fi

  build_push "$svc" "$ctx"
  BUILT=$((BUILT + 1))
done

[[ $BUILT -eq 0 ]] && err "Service '$TARGET_ONLY' not found. Valid names: eureka-server api-gateway user-service contact-service project-service audit-service frontend"

step "All images pushed to ECR"
echo ""
echo "  ECR Registry: $ECR_REGISTRY"
echo "  Tag         : $IMAGE_TAG"
echo ""
aws ecr describe-repositories \
  --region "$AWS_REGION" \
  --query "repositories[?contains(repositoryName,'${APP_NAME}')].[repositoryName,repositoryUri]" \
  --output table
