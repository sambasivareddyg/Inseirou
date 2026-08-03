#!/usr/bin/env bash
# =============================================================================
#  redeploy.sh  -  Quickly rebuild and redeploy a single service
#
#  Usage:
#    bash redeploy.sh user-service
#    bash redeploy.sh frontend
#    bash redeploy.sh all          # redeploy everything
# =============================================================================

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/config.sh"

G='\033[0;32m'; R='\033[0;31m'; B='\033[1m'; N='\033[0m'
ok()  { echo -e "${G}[OK]${N}  $*"; }
err() { echo -e "${R}[ERR]${N} $*"; exit 1; }
step(){ echo -e "\n${B}===> $*${N}"; }

SERVICE="${1:-}"
[[ -z "$SERVICE" ]] && err "Usage: bash redeploy.sh <service-name|all>"

step "Redeploying: $SERVICE"

# Build and push
bash "$SCRIPT_DIR/02-build-push.sh" "$SERVICE"

# Deploy to EB
bash "$SCRIPT_DIR/03-deploy-services.sh" "$SERVICE"

step "Done"
bash "$SCRIPT_DIR/status.sh"
