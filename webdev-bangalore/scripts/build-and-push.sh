#!/bin/bash
# ============================================================
#  build-and-push.sh — Build all Docker images
#  Usage:
#    Local:  ./scripts/build-and-push.sh local
#    AWS ECR: ./scripts/build-and-push.sh aws <aws-account-id> <region>
# ============================================================
set -e

MODE=${1:-local}
AWS_ACCOUNT=${2:-""}
AWS_REGION=${3:-"ap-south-1"}
VERSION="1.0.0"

REGISTRY_PREFIX=""
if [ "$MODE" = "aws" ]; then
  if [ -z "$AWS_ACCOUNT" ]; then
    echo "Error: AWS account ID required for AWS mode"
    echo "Usage: $0 aws <aws-account-id> <region>"
    exit 1
  fi
  REGISTRY_PREFIX="${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com/"
  echo "Logging in to ECR..."
  aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin "${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com"

  # Create ECR repos if they don't exist
  for svc in eureka-server api-gateway user-service contact-service project-service audit-service frontend; do
    aws ecr describe-repositories --repository-names "pixelcraft/$svc" --region $AWS_REGION 2>/dev/null || \
      aws ecr create-repository --repository-name "pixelcraft/$svc" --region $AWS_REGION
  done
fi

build_and_push() {
  local name=$1
  local context=$2
  local image="${REGISTRY_PREFIX}pixelcraft/${name}:${VERSION}"
  echo ""
  echo "📦 Building: $image"
  docker build -t "$image" "$context"
  if [ "$MODE" = "aws" ]; then
    echo "⬆️  Pushing: $image"
    docker push "$image"
  fi
}

echo "🚀 Building PixelCraft Studio images (mode=$MODE, version=$VERSION)"

build_and_push "eureka-server"   "./backend/eureka-server"
build_and_push "api-gateway"     "./backend/api-gateway"
build_and_push "user-service"    "./backend/user-service"
build_and_push "contact-service" "./backend/contact-service"
build_and_push "project-service" "./backend/project-service"
build_and_push "audit-service"   "./backend/audit-service"
build_and_push "frontend"        "./frontend"

echo ""
echo "✅ All images built successfully!"
if [ "$MODE" = "aws" ]; then
  echo "✅ All images pushed to ECR: ${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com"
fi
