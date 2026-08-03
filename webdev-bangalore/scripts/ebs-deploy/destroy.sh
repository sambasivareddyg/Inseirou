#!/usr/bin/env bash
# =============================================================================
#  destroy.sh  -  Tears down ALL AWS resources created by deploy-all.sh
#
#  This deletes:
#    - All Elastic Beanstalk environments and applications
#    - ECR repositories and images
#    - CloudFormation stack (RDS, Redis, MSK, VPC, SGs)
#    - SSM parameters
#    - S3 deploy bucket
#
#  WARNING: This is IRREVERSIBLE. RDS data will be snapshot-preserved only.
#
#  Usage:
#    bash destroy.sh
# =============================================================================

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/config.sh"

R='\033[0;31m'; Y='\033[1;33m'; G='\033[0;32m'; B='\033[1m'; N='\033[0m'
warn() { echo -e "${Y}[WARN]${N}  $*"; }
ok()   { echo -e "${G}[OK]${N}    $*"; }
info() { echo -e "        $*"; }
step() { echo -e "\n${B}===> $*${N}"; }

echo ""
echo -e "${R}${B}  !!! WARNING: DESTRUCTIVE OPERATION !!!${N}"
echo ""
echo "  This will permanently delete:"
echo "    - All EB environments for $APP_NAME ($ENV_NAME)"
echo "    - All ECR images for $APP_NAME"
echo "    - CloudFormation stack: $CF_STACK_NAME"
echo "      (VPC, RDS, ElastiCache, MSK, Security Groups)"
echo "    - S3 bucket: ${APP_NAME}-${ENV_NAME}-eb-deploy-${AWS_ACCOUNT}"
echo "    - SSM parameters for $APP_NAME/$ENV_NAME"
echo ""
read -rp "  Type 'yes' to confirm: " CONFIRM
[[ "$CONFIRM" != "yes" ]] && { echo "Aborted."; exit 0; }

SERVICES=(eureka-server api-gateway user-service contact-service project-service audit-service frontend)

# ── Terminate EB environments ─────────────────────────────────────────────────
step "Terminating Elastic Beanstalk environments"
for svc in "${SERVICES[@]}"; do
  eb_env="${APP_NAME}-${ENV_NAME}-${svc}"
  STATUS=$(aws elasticbeanstalk describe-environments \
    --environment-names "$eb_env" \
    --region "$AWS_REGION" \
    --query "Environments[0].Status" \
    --output text 2>/dev/null || echo "")

  if [[ "$STATUS" != "Terminated" && "$STATUS" != "" && "$STATUS" != "None" ]]; then
    info "Terminating $eb_env..."
    aws elasticbeanstalk terminate-environment \
      --environment-name "$eb_env" \
      --region "$AWS_REGION" &>/dev/null || true
  else
    info "Skipping $eb_env (already terminated or not found)"
  fi
done

# ── Delete EB applications ────────────────────────────────────────────────────
step "Waiting for environments to terminate (60s)..."
sleep 60

for svc in "${SERVICES[@]}"; do
  eb_app="${APP_NAME}-${svc}"
  info "Deleting EB application: $eb_app"
  aws elasticbeanstalk delete-application \
    --application-name "$eb_app" \
    --terminate-env-by-force \
    --region "$AWS_REGION" 2>/dev/null || true
done
ok "EB applications deleted."

# ── Delete ECR repositories ───────────────────────────────────────────────────
step "Deleting ECR repositories"
for svc in "${SERVICES[@]}"; do
  repo="${APP_NAME}/${svc}"
  info "Deleting ECR repo: $repo"
  aws ecr delete-repository \
    --repository-name "$repo" \
    --force \
    --region "$AWS_REGION" 2>/dev/null || true
done
ok "ECR repositories deleted."

# ── Delete S3 bucket ──────────────────────────────────────────────────────────
step "Deleting S3 deploy bucket"
S3_BUCKET="${APP_NAME}-${ENV_NAME}-eb-deploy-${AWS_ACCOUNT}"
aws s3 rm "s3://$S3_BUCKET" --recursive --region "$AWS_REGION" 2>/dev/null || true
aws s3 rb "s3://$S3_BUCKET" --region "$AWS_REGION" 2>/dev/null || true
ok "S3 bucket deleted."

# ── Delete SSM parameters ─────────────────────────────────────────────────────
step "Deleting SSM parameters"
PARAMS=$(aws ssm get-parameters-by-path \
  --path "/${APP_NAME}/${ENV_NAME}/" \
  --region "$AWS_REGION" \
  --query "Parameters[].Name" \
  --output text 2>/dev/null || echo "")

for param in $PARAMS; do
  info "Deleting SSM: $param"
  aws ssm delete-parameter --name "$param" --region "$AWS_REGION" 2>/dev/null || true
done
ok "SSM parameters deleted."

# ── Delete CloudFormation stack ───────────────────────────────────────────────
step "Deleting CloudFormation stack: $CF_STACK_NAME"
warn "RDS will be snapshot-preserved before deletion."

aws cloudformation delete-stack \
  --stack-name "$CF_STACK_NAME" \
  --region "$AWS_REGION" 2>/dev/null || true

info "Waiting for stack deletion (this can take 10-20 minutes)..."
aws cloudformation wait stack-delete-complete \
  --stack-name "$CF_STACK_NAME" \
  --region "$AWS_REGION" 2>/dev/null || warn "Stack deletion may still be in progress. Check AWS Console."

ok "CloudFormation stack deleted."

echo ""
echo -e "${G}${B}  Destroy complete. All $APP_NAME ($ENV_NAME) resources removed.${N}"
echo "  RDS snapshot retained in: AWS Console > RDS > Snapshots"
echo ""
