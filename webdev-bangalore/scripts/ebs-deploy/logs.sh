#!/usr/bin/env bash
# =============================================================================
#  logs.sh  -  Fetch or tail logs from an EB environment
#
#  Usage:
#    bash logs.sh user-service          # fetch last 100 lines
#    bash logs.sh user-service --tail   # tail in real time via eb logs
#    bash logs.sh all                   # fetch logs from all services
# =============================================================================

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/config.sh"

C='\033[0;36m'; B='\033[1m'; R='\033[0;31m'; N='\033[0m'
info() { echo -e "${C}[INFO]${N} $*"; }
err()  { echo -e "${R}[ERR]${N}  $*"; exit 1; }
step() { echo -e "\n${B}===> $*${N}"; }

SERVICE="${1:-}"
MODE="${2:---fetch}"

[[ -z "$SERVICE" ]] && err "Usage: bash logs.sh <service-name|all> [--tail]"

SERVICES_ALL=(eureka-server api-gateway user-service contact-service project-service audit-service frontend)

fetch_logs() {
  local svc="$1"
  local eb_env="${APP_NAME}-${ENV_NAME}-${svc}"

  step "Logs: $svc  ($eb_env)"

  if [[ "$MODE" == "--tail" ]]; then
    info "Requesting real-time logs (Ctrl+C to stop)..."
    # Request log bundle
    aws elasticbeanstalk request-environment-info \
      --environment-name "$eb_env" \
      --info-type tail \
      --region "$AWS_REGION"
    sleep 8
    # Retrieve and print
    aws elasticbeanstalk retrieve-environment-info \
      --environment-name "$eb_env" \
      --info-type tail \
      --region "$AWS_REGION" \
      --query "EnvironmentInfo[0].Message" \
      --output text
  else
    aws elasticbeanstalk request-environment-info \
      --environment-name "$eb_env" \
      --info-type tail \
      --region "$AWS_REGION"
    sleep 5
    # Get the S3 URL for the log bundle
    LOG_URL=$(aws elasticbeanstalk retrieve-environment-info \
      --environment-name "$eb_env" \
      --info-type tail \
      --region "$AWS_REGION" \
      --query "EnvironmentInfo[0].Message" \
      --output text)
    echo "$LOG_URL"
    echo ""
    # Download and display
    curl -s "$LOG_URL" 2>/dev/null || info "Could not download log. Open URL above in browser."
  fi
}

if [[ "$SERVICE" == "all" ]]; then
  for svc in "${SERVICES_ALL[@]}"; do
    fetch_logs "$svc"
  done
else
  fetch_logs "$SERVICE"
fi
