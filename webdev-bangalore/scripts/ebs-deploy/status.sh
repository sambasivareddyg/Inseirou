#!/usr/bin/env bash
# =============================================================================
#  status.sh  -  Show status of all Elastic Beanstalk environments
#
#  Usage:
#    bash status.sh              # show all
#    bash status.sh --watch      # refresh every 30s until all healthy
# =============================================================================

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/config.sh"

G='\033[0;32m'; R='\033[0;31m'; Y='\033[1;33m'; C='\033[0;36m'; B='\033[1m'; N='\033[0m'

WATCH=false
[[ "${1:-}" == "--watch" ]] && WATCH=true

SERVICES=(eureka-server api-gateway user-service contact-service project-service audit-service frontend)

print_status() {
  echo ""
  echo -e "${B}  EB Environment Status - $APP_NAME ($ENV_NAME)${N}"
  echo "  $(date)"
  echo "  ----------------------------------------------------------------"
  printf "  %-25s %-15s %-12s %s\n" "SERVICE" "STATUS" "HEALTH" "URL"
  echo "  ----------------------------------------------------------------"

  ALL_OK=true

  for svc in "${SERVICES[@]}"; do
    local eb_env="${APP_NAME}-${ENV_NAME}-${svc}"

    read -r status health cname <<< "$(aws elasticbeanstalk describe-environments \
      --environment-names "$eb_env" \
      --region "$AWS_REGION" \
      --query "Environments[0].[Status,Health,CNAME]" \
      --output text 2>/dev/null || echo "NotFound - -")"

    case "$health" in
      Green)  color=$G ;;
      Yellow) color=$Y ;;
      Red)    color=$R; ALL_OK=false ;;
      *)      color=$C; ALL_OK=false ;;
    esac

    local url="${cname:--}"
    [[ "$url" != "-" ]] && url="http://$url"

    printf "  %-25s %-15s ${color}%-12s${N} %s\n" "$svc" "${status:--}" "${health:--}" "$url"
  done

  echo "  ----------------------------------------------------------------"

  # CloudFormation infra status
  CF_STATUS=$(aws cloudformation describe-stacks \
    --stack-name "$CF_STACK_NAME" \
    --region "$AWS_REGION" \
    --query "Stacks[0].StackStatus" \
    --output text 2>/dev/null || echo "NOT_FOUND")
  echo ""
  echo "  CloudFormation Stack : $CF_STACK_NAME  ->  $CF_STATUS"

  # RDS / Redis endpoints
  RDS=$(aws ssm get-parameter --name "/${APP_NAME}/${ENV_NAME}/rds-endpoint" \
    --region "$AWS_REGION" --query "Parameter.Value" --output text 2>/dev/null || echo "n/a")
  REDIS=$(aws ssm get-parameter --name "/${APP_NAME}/${ENV_NAME}/redis-endpoint" \
    --region "$AWS_REGION" --query "Parameter.Value" --output text 2>/dev/null || echo "n/a")
  MSK=$(aws ssm get-parameter --name "/${APP_NAME}/${ENV_NAME}/msk-brokers" \
    --region "$AWS_REGION" --query "Parameter.Value" --output text 2>/dev/null || echo "n/a")

  echo "  RDS MySQL            : $RDS"
  echo "  ElastiCache Redis    : $REDIS"
  echo "  MSK Kafka            : $MSK"
  echo ""

  $ALL_OK && return 0 || return 1
}

if $WATCH; then
  while true; do
    clear
    print_status && {
      echo -e "  ${G}All environments are Green!${N}"
      break
    } || {
      echo "  Waiting 30s before refresh... (Ctrl+C to exit)"
      sleep 30
    }
  done
else
  print_status || true
fi
