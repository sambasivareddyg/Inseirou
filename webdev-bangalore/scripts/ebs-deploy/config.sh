#!/usr/bin/env bash
# =============================================================================
#  config.sh  -  Central configuration for all deploy scripts
#  Edit this file before running deploy-all.sh
# =============================================================================

# ── AWS Settings ──────────────────────────────────────────────────────────────
export AWS_REGION="ap-south-1"          # Mumbai (change if needed)
export AWS_ACCOUNT=""                    # Auto-detected from aws sts if left blank

# ── Application Identity ──────────────────────────────────────────────────────
export APP_NAME="pixelcraft"             # Prefix for all AWS resources
export ENV_NAME="production"             # e.g. production, staging
export PROJECT_ROOT="../"               # Path to webdev-bangalore project root

# ── ECR ───────────────────────────────────────────────────────────────────────
export ECR_REGISTRY=""                   # Auto-set: <account>.dkr.ecr.<region>.amazonaws.com
export IMAGE_TAG="latest"               # Docker image tag

# ── Elastic Beanstalk ─────────────────────────────────────────────────────────
export EB_PLATFORM="Docker running on 64bit Amazon Linux 2023"
export EB_INSTANCE_TYPE="t3.small"      # t3.micro for dev, t3.small+ for prod
export EB_MIN_INSTANCES=1
export EB_MAX_INSTANCES=3
export EB_KEY_PAIR=""                   # EC2 key pair name (for SSH). Leave blank = no SSH.

# ── RDS MySQL ─────────────────────────────────────────────────────────────────
export RDS_INSTANCE_CLASS="db.t3.micro" # db.t3.micro (dev) | db.t3.small+ (prod)
export RDS_STORAGE_GB=20
export RDS_DB_NAME="webdev"
export RDS_USERNAME="webdev"
export RDS_PASSWORD="WebDev@2024!"      # CHANGE THIS to a strong password
export RDS_MULTI_AZ="false"            # true for production HA

# ── ElastiCache Redis ─────────────────────────────────────────────────────────
export REDIS_NODE_TYPE="cache.t3.micro" # cache.t3.micro (dev) | cache.t3.small+ (prod)
export REDIS_NUM_REPLICAS=0            # 0=single node (dev) | 1+ for HA prod

# ── MSK Kafka ─────────────────────────────────────────────────────────────────
export MSK_BROKER_TYPE="kafka.t3.small" # kafka.t3.small (dev) | kafka.m5.large (prod)
export MSK_BROKER_COUNT=3
export MSK_KAFKA_VERSION="3.5.1"
export MSK_STORAGE_GB=20

# ── CloudFormation Stack Name ─────────────────────────────────────────────────
export CF_STACK_NAME="${APP_NAME}-${ENV_NAME}-infra"

# ── Services to deploy (name:port:db) ─────────────────────────────────────────
# Format: "service-folder:port:database-name"
# Leave db blank for eureka-server and api-gateway
export SERVICES=(
  "eureka-server:8761:"
  "api-gateway:8080:"
  "user-service:8081:webdev_users"
  "contact-service:8082:webdev_contacts"
  "project-service:8083:webdev_projects"
  "audit-service:8084:webdev_audit"
  "frontend:80:"
)

# ── Derived values (do not edit) ─────────────────────────────────────────────
setup_derived() {
  if [[ -z "$AWS_ACCOUNT" ]]; then
    AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "")
  fi
  ECR_REGISTRY="${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com"
  export ECR_REGISTRY AWS_ACCOUNT
}

setup_derived
