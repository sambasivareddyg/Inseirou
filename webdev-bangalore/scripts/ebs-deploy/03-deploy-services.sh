#!/usr/bin/env bash
# =============================================================================
#  03-deploy-services.sh
#  Creates or updates an Elastic Beanstalk application + environment for
#  every microservice and the frontend.
#
#  Each service gets:
#    - Its own EB Application
#    - A single-instance or load-balanced EB Environment
#    - Environment variables injected from SSM / CloudFormation outputs
#    - A Dockerrun.aws.json pointing to its ECR image
#
#  Usage:
#    bash 03-deploy-services.sh                 # deploy all
#    bash 03-deploy-services.sh user-service    # redeploy one
# =============================================================================

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/config.sh"

R='\033[0;31m'; G='\033[0;32m'; Y='\033[1;33m'; C='\033[0;36m'; B='\033[1m'; N='\033[0m'
ok()   { echo -e "${G}[OK]${N}   $*"; }
err()  { echo -e "${R}[ERR]${N}  $*"; exit 1; }
info() { echo -e "${C}[INFO]${N} $*"; }
step() { echo -e "\n${B}===> $*${N}"; }

TARGET_ONLY="${1:-all}"

# ── Read SSM values ───────────────────────────────────────────────────────────
ssm() {
  aws ssm get-parameter \
    --name "/${APP_NAME}/${ENV_NAME}/$1" \
    --region "$AWS_REGION" \
    --query "Parameter.Value" \
    --output text 2>/dev/null || echo ""
}

step "Reading infrastructure config from SSM"
VPC_ID=$(ssm vpc-id)
SUBNET1=$(ssm public-subnet-1)
SUBNET2=$(ssm public-subnet-2)
APP_SG=$(ssm app-sg)
RDS_HOST=$(ssm rds-endpoint)
REDIS_HOST=$(ssm redis-endpoint)
MSK_BROKERS=$(ssm msk-brokers)

[[ -z "$VPC_ID"    ]] && err "VPC ID not found in SSM. Did 01-infra.sh complete?"
[[ -z "$RDS_HOST"  ]] && err "RDS endpoint not found in SSM."
[[ -z "$REDIS_HOST"]] && err "Redis endpoint not found in SSM."
[[ -z "$MSK_BROKERS" ]] && warn "MSK brokers not found - Kafka env var will be empty."

info "VPC       : $VPC_ID"
info "Subnets   : $SUBNET1, $SUBNET2"
info "RDS       : $RDS_HOST"
info "Redis     : $REDIS_HOST"
info "Kafka     : $MSK_BROKERS"

# ── S3 bucket for EB source bundles ──────────────────────────────────────────
S3_BUCKET="${APP_NAME}-${ENV_NAME}-eb-deploy-${AWS_ACCOUNT}"
aws s3 mb "s3://$S3_BUCKET" --region "$AWS_REGION" 2>/dev/null || true
ok "S3 bucket: $S3_BUCKET"

# ── EB IAM roles (create once) ────────────────────────────────────────────────
ensure_eb_iam() {
  # aws-elasticbeanstalk-ec2-role
  if ! aws iam get-instance-profile --instance-profile-name "aws-elasticbeanstalk-ec2-role" &>/dev/null; then
    info "Creating EB EC2 instance profile..."
    aws iam create-role \
      --role-name "aws-elasticbeanstalk-ec2-role" \
      --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}' \
      --region "$AWS_REGION" &>/dev/null || true

    for policy in AWSElasticBeanstalkWebTier AWSElasticBeanstalkWorkerTier AWSElasticBeanstalkMulticontainerDocker AmazonSSMReadOnlyAccess AmazonEC2ContainerRegistryReadOnly; do
      aws iam attach-role-policy \
        --role-name "aws-elasticbeanstalk-ec2-role" \
        --policy-arn "arn:aws:iam::aws:policy/$policy" 2>/dev/null || true
    done

    aws iam create-instance-profile \
      --instance-profile-name "aws-elasticbeanstalk-ec2-role" &>/dev/null || true
    aws iam add-role-to-instance-profile \
      --instance-profile-name "aws-elasticbeanstalk-ec2-role" \
      --role-name "aws-elasticbeanstalk-ec2-role" 2>/dev/null || true
    ok "EB EC2 role created."
  fi

  # aws-elasticbeanstalk-service-role
  if ! aws iam get-role --role-name "aws-elasticbeanstalk-service-role" &>/dev/null; then
    info "Creating EB service role..."
    aws iam create-role \
      --role-name "aws-elasticbeanstalk-service-role" \
      --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"elasticbeanstalk.amazonaws.com"},"Action":"sts:AssumeRole"}]}' &>/dev/null || true
    aws iam attach-role-policy \
      --role-name "aws-elasticbeanstalk-service-role" \
      --policy-arn "arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkEnhancedHealth" 2>/dev/null || true
    aws iam attach-role-policy \
      --role-name "aws-elasticbeanstalk-service-role" \
      --policy-arn "arn:aws:iam::aws:policy/AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy" 2>/dev/null || true
    ok "EB service role created."
  fi
}

ensure_eb_iam

# ── Helper: build Dockerrun.aws.json for a service ────────────────────────────
make_dockerrun() {
  local svc="$1"
  local port="$2"
  local image="${ECR_REGISTRY}/${APP_NAME}/${svc}:${IMAGE_TAG}"

  cat << DREOF
{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "$image",
    "Update": "true"
  },
  "Ports": [
    { "ContainerPort": $port, "HostPort": $port }
  ],
  "Logging": "/var/log/app"
}
DREOF
}

# ── Helper: build env vars option string for EB ───────────────────────────────
common_env_vars() {
  local db="$1"
  local port="$2"
  local vars=""

  vars+="SPRING_PROFILES_ACTIVE=prod,"
  vars+="SERVER_PORT=${port},"
  vars+="SPRING_KAFKA_BOOTSTRAP_SERVERS=${MSK_BROKERS},"
  vars+="SPRING_DATA_REDIS_HOST=${REDIS_HOST},"
  vars+="SPRING_DATA_REDIS_PORT=6379,"
  vars+="SPRING_DATA_REDIS_MODE=standalone,"
  vars+="EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://$(get_eb_url eureka-server):8761/eureka/,"
  vars+="EUREKA_INSTANCE_PREFER_IP_ADDRESS=true,"
  vars+="JWT_SECRET=${APP_NAME}-prod-jwt-secret-change-me"

  if [[ -n "$db" ]]; then
    local jdbc="jdbc:mysql://${RDS_HOST}:3306/${db}?useSSL=true&requireSSL=false&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true"
    vars+=",SPRING_DATASOURCE_URL=${jdbc}"
    vars+=",SPRING_DATASOURCE_USERNAME=${RDS_USERNAME}"
    vars+=",SPRING_DATASOURCE_PASSWORD=${RDS_PASSWORD}"
    vars+=",SPRING_JPA_HIBERNATE_DDL_AUTO=update"
  fi

  echo "$vars"
}

# ── Helper: get existing EB env URL ───────────────────────────────────────────
get_eb_url() {
  local svc="$1"
  local eb_env="${APP_NAME}-${ENV_NAME}-${svc}"
  aws elasticbeanstalk describe-environments \
    --environment-names "$eb_env" \
    --region "$AWS_REGION" \
    --query "Environments[0].CNAME" \
    --output text 2>/dev/null || echo "localhost"
}

# ── Helper: deploy one service to EB ─────────────────────────────────────────
deploy_service() {
  local svc="$1"
  local port="$2"
  local db="$3"

  local eb_app="${APP_NAME}-${svc}"
  local eb_env="${APP_NAME}-${ENV_NAME}-${svc}"
  local bundle="/tmp/${eb_env}-bundle.zip"
  local s3_key="bundles/${eb_env}-$(date +%Y%m%d%H%M%S).zip"
  local version_label="${svc}-$(date +%Y%m%d%H%M%S)"

  step "Deploying $svc  (EB app: $eb_app, env: $eb_env)"

  # Create Dockerrun.aws.json
  local tmpdir="/tmp/${eb_env}"
  mkdir -p "$tmpdir"
  make_dockerrun "$svc" "$port" > "$tmpdir/Dockerrun.aws.json"

  # Zip it
  (cd "$tmpdir" && zip -q "$bundle" Dockerrun.aws.json)
  rm -rf "$tmpdir"

  # Upload to S3
  aws s3 cp "$bundle" "s3://${S3_BUCKET}/${s3_key}" --region "$AWS_REGION"
  ok "Bundle uploaded: s3://${S3_BUCKET}/${s3_key}"

  # Create EB application if it doesn't exist
  aws elasticbeanstalk create-application \
    --application-name "$eb_app" \
    --region "$AWS_REGION" 2>/dev/null || true

  # Create application version
  aws elasticbeanstalk create-application-version \
    --application-name "$eb_app" \
    --version-label "$version_label" \
    --source-bundle "S3Bucket=${S3_BUCKET},S3Key=${s3_key}" \
    --region "$AWS_REGION"

  # Build env vars
  local env_vars
  env_vars=$(common_env_vars "$db" "$port")

  # EB option settings
  local opts='[
    {"Namespace":"aws:elasticbeanstalk:environment","OptionName":"EnvironmentType","Value":"SingleInstance"},
    {"Namespace":"aws:autoscaling:launchconfiguration","OptionName":"InstanceType","Value":"'"$EB_INSTANCE_TYPE"'"},
    {"Namespace":"aws:autoscaling:launchconfiguration","OptionName":"IamInstanceProfile","Value":"aws-elasticbeanstalk-ec2-role"},
    {"Namespace":"aws:elasticbeanstalk:environment","OptionName":"ServiceRole","Value":"aws-elasticbeanstalk-service-role"},
    {"Namespace":"aws:ec2:vpc","OptionName":"VPCId","Value":"'"$VPC_ID"'"},
    {"Namespace":"aws:ec2:vpc","OptionName":"Subnets","Value":"'"$SUBNET1"'"},
    {"Namespace":"aws:ec2:vpc","OptionName":"AssociatePublicIpAddress","Value":"true"},
    {"Namespace":"aws:autoscaling:launchconfiguration","OptionName":"SecurityGroups","Value":"'"$APP_SG"'"},
    {"Namespace":"aws:elasticbeanstalk:healthreporting:system","OptionName":"SystemType","Value":"enhanced"},
    {"Namespace":"aws:elasticbeanstalk:application","OptionName":"Application Healthcheck URL","Value":"/actuator/health"}
  ]'

  # Check if env exists
  local env_status
  env_status=$(aws elasticbeanstalk describe-environments \
    --environment-names "$eb_env" \
    --region "$AWS_REGION" \
    --query "Environments[0].Status" \
    --output text 2>/dev/null || echo "Missing")

  if [[ "$env_status" == "None" || "$env_status" == "Missing" || "$env_status" == "" ]]; then
    info "Creating new EB environment: $eb_env"
    aws elasticbeanstalk create-environment \
      --application-name "$eb_app" \
      --environment-name "$eb_env" \
      --version-label "$version_label" \
      --platform-arn "$(resolve_platform_arn)" \
      --option-settings "$opts" \
      --region "$AWS_REGION"
  else
    info "Updating existing EB environment: $eb_env  (status: $env_status)"
    aws elasticbeanstalk update-environment \
      --application-name "$eb_app" \
      --environment-name "$eb_env" \
      --version-label "$version_label" \
      --region "$AWS_REGION"
  fi

  # Inject env vars via update-environment option-settings
  # Build env var option settings JSON
  local env_opts="[]"
  IFS=',' read -ra PAIRS <<< "$env_vars"
  for pair in "${PAIRS[@]}"; do
    local key="${pair%%=*}"
    local val="${pair#*=}"
    env_opts=$(echo "$env_opts" | jq \
      --arg k "$key" --arg v "$val" \
      '. += [{"Namespace":"aws:elasticbeanstalk:application:environment","OptionName":$k,"Value":$v}]')
  done

  aws elasticbeanstalk update-environment \
    --environment-name "$eb_env" \
    --option-settings "$env_opts" \
    --region "$AWS_REGION" &>/dev/null || true

  ok "$svc deployment submitted."
}

# ── Resolve latest EB Docker platform ARN ────────────────────────────────────
resolve_platform_arn() {
  aws elasticbeanstalk list-platform-versions \
    --region "$AWS_REGION" \
    --filters "Type=PlatformName,Operator=contains,Values=Docker" \
               "Type=PlatformStatus,Operator==,Values=Ready" \
    --query "PlatformSummaryList | sort_by(@, &PlatformVersion) | [-1].PlatformArn" \
    --output text
}

# ── Deploy all services in dependency order ───────────────────────────────────
# Format: "service-folder port database"
declare -a DEPLOY_ORDER=(
  "eureka-server   8761 "
  "api-gateway     8080 "
  "user-service    8081 webdev_users"
  "contact-service 8082 webdev_contacts"
  "project-service 8083 webdev_projects"
  "audit-service   8084 webdev_audit"
  "frontend        80   "
)

DEPLOYED=0
for entry in "${DEPLOY_ORDER[@]}"; do
  read -r svc port db <<< "$entry"
  db="${db:-}"

  if [[ "$TARGET_ONLY" != "all" && "$TARGET_ONLY" != "$svc" ]]; then
    continue
  fi

  deploy_service "$svc" "$port" "$db"
  DEPLOYED=$((DEPLOYED + 1))

  # Give Eureka time to start before others register with it
  if [[ "$svc" == "eureka-server" && "$TARGET_ONLY" == "all" ]]; then
    info "Waiting 60s for Eureka to launch before deploying other services..."
    sleep 60
  fi
done

[[ $DEPLOYED -eq 0 ]] && err "Service '$TARGET_ONLY' not found."

step "All deployments submitted. Checking status..."
bash "$SCRIPT_DIR/status.sh"
