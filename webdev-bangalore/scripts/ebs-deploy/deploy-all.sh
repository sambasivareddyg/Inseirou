#!/usr/bin/env bash
# =============================================================================
#  deploy-all.sh
#  Master script - deploys entire PixelCraft Studio to AWS Elastic Beanstalk
#
#  What this does:
#    1. Validates AWS CLI + EB CLI are installed
#    2. Creates ECR repos and pushes Docker images
#    3. Provisions RDS MySQL, ElastiCache Redis, MSK Kafka via CloudFormation
#    4. Deploys each microservice to its own EB environment
#    5. Deploys the React frontend to EB
#
#  Usage:
#    bash deploy-all.sh            # full deploy
#    bash deploy-all.sh --infra    # infra only (RDS/Redis/Kafka)
#    bash deploy-all.sh --apps     # apps only (assumes infra exists)
#    bash deploy-all.sh --destroy  # tear everything down
#
#  Prerequisites:
#    aws cli v2    https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
#    eb cli        pip install awsebcli
#    docker        https://docs.docker.com/get-docker/
#    jq            https://stedolan.github.io/jq/
#
#  Run aws configure first to set your credentials.
# =============================================================================

set -euo pipefail

# ── Load config ───────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/config.sh"

# ── Colours ───────────────────────────────────────────────────────────────────
R='\033[0;31m'; G='\033[0;32m'; Y='\033[1;33m'; C='\033[0;36m'; B='\033[1m'; N='\033[0m'
ok()   { echo -e "${G}[OK]${N}    $*"; }
err()  { echo -e "${R}[ERR]${N}   $*"; exit 1; }
warn() { echo -e "${Y}[WARN]${N}  $*"; }
info() { echo -e "${C}[INFO]${N}  $*"; }
step() { echo -e "\n${B}===> $* ${N}"; }

MODE="all"
[[ "${1:-}" == "--infra"   ]] && MODE="infra"
[[ "${1:-}" == "--apps"    ]] && MODE="apps"
[[ "${1:-}" == "--destroy" ]] && MODE="destroy"

echo ""
echo "  PixelCraft Studio - AWS Elastic Beanstalk Deployment"
echo "  App: $APP_NAME  |  Env: $ENV_NAME  |  Region: $AWS_REGION"
echo ""

# ── Prereq check ──────────────────────────────────────────────────────────────
step "Checking prerequisites"
command -v aws  &>/dev/null || err "aws cli not found. Install: https://aws.amazon.com/cli/"
command -v eb   &>/dev/null || err "eb cli not found. Run: pip install awsebcli"
command -v docker &>/dev/null || err "docker not found."
command -v jq   &>/dev/null || err "jq not found. Install: https://stedolan.github.io/jq/"

AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text) || err "AWS credentials not configured. Run: aws configure"
ok "AWS Account: $AWS_ACCOUNT  |  Region: $AWS_REGION"

export AWS_ACCOUNT

# ── Destroy mode ──────────────────────────────────────────────────────────────
if [[ "$MODE" == "destroy" ]]; then
  bash "$SCRIPT_DIR/destroy.sh"
  exit 0
fi

# ── Infra ─────────────────────────────────────────────────────────────────────
if [[ "$MODE" == "all" || "$MODE" == "infra" ]]; then
  bash "$SCRIPT_DIR/01-infra.sh"
fi

# ── Build & push images ───────────────────────────────────────────────────────
if [[ "$MODE" == "all" || "$MODE" == "apps" ]]; then
  bash "$SCRIPT_DIR/02-build-push.sh"
  bash "$SCRIPT_DIR/03-deploy-services.sh"
fi

step "Deployment complete"
bash "$SCRIPT_DIR/status.sh"
