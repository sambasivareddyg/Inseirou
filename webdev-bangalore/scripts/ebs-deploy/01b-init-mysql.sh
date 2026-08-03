#!/usr/bin/env bash
# =============================================================================
#  01b-init-mysql.sh
#  Initialises MySQL databases on RDS.
#
#  Run this AFTER 01-infra.sh from:
#    - A bastion/jump host inside the VPC, OR
#    - Your machine with a temporary inbound rule on the RDS SG allowing your IP
#
#  Usage:
#    bash 01b-init-mysql.sh
# =============================================================================

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/config.sh"

G='\033[0;32m'; C='\033[0;36m'; B='\033[1m'; N='\033[0m'
ok()   { echo -e "${G}[OK]${N}   $*"; }
info() { echo -e "${C}[INFO]${N} $*"; }
step() { echo -e "\n${B}===> $*${N}"; }

# ── Fetch RDS endpoint from SSM ───────────────────────────────────────────────
RDS_HOST=$(aws ssm get-parameter \
  --name "/${APP_NAME}/${ENV_NAME}/rds-endpoint" \
  --region "$AWS_REGION" \
  --query "Parameter.Value" --output text)

info "RDS Host : $RDS_HOST"
info "User     : $RDS_USERNAME"

step "Creating databases and application user"

mysql -h "$RDS_HOST" -P 3306 -u "$RDS_USERNAME" -p"$RDS_PASSWORD" << SQL
CREATE DATABASE IF NOT EXISTS webdev_users     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS webdev_contacts  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS webdev_projects  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS webdev_audit     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'webdev'@'%' IDENTIFIED BY '${RDS_PASSWORD}';
GRANT ALL PRIVILEGES ON webdev_users.*    TO 'webdev'@'%';
GRANT ALL PRIVILEGES ON webdev_contacts.* TO 'webdev'@'%';
GRANT ALL PRIVILEGES ON webdev_projects.* TO 'webdev'@'%';
GRANT ALL PRIVILEGES ON webdev_audit.*    TO 'webdev'@'%';
FLUSH PRIVILEGES;

SHOW DATABASES;
SQL

ok "MySQL databases initialised."
