#!/bin/bash
# ============================================================
#  deploy-k8s.sh — Deploy to Kubernetes
#  Usage:
#    On-Prem: ./scripts/deploy-k8s.sh onprem
#    AWS EKS: ./scripts/deploy-k8s.sh aws
# ============================================================
set -e

TARGET=${1:-onprem}
MANIFESTS_DIR="./infrastructure/kubernetes/${TARGET}"
NAMESPACE="webdev"

if [ ! -d "$MANIFESTS_DIR" ]; then
  echo "Error: manifests directory not found: $MANIFESTS_DIR"
  exit 1
fi

echo "🚀 Deploying PixelCraft Studio to Kubernetes (target=$TARGET)"
echo "Manifests: $MANIFESTS_DIR"

# Apply in order
echo ""
echo "📋 Applying namespace and config..."
kubectl apply -f "$MANIFESTS_DIR/00-namespace-config.yaml"

echo "⏳ Waiting for namespace..."
kubectl wait --for=condition=Active namespace/$NAMESPACE --timeout=30s

if [ "$TARGET" = "onprem" ]; then
  echo "🗄️  Deploying MySQL..."
  kubectl apply -f "$MANIFESTS_DIR/01-mysql.yaml"

  echo "⚡ Deploying Redis Cluster..."
  kubectl apply -f "$MANIFESTS_DIR/02-redis-cluster.yaml"

  echo "📨 Deploying Kafka + Zookeeper..."
  kubectl apply -f "$MANIFESTS_DIR/03-kafka.yaml"

  echo "⏳ Waiting for MySQL to be ready (this may take ~2 min)..."
  kubectl rollout status statefulset/mysql -n $NAMESPACE --timeout=300s
fi

echo "🔧 Deploying backend microservices..."
kubectl apply -f "$MANIFESTS_DIR/$([ "$TARGET" = "aws" ] && echo "01" || echo "04")-backend-services.yaml"

echo "⏳ Waiting for Eureka Server..."
kubectl rollout status deployment/eureka-server -n $NAMESPACE --timeout=180s

echo "🌐 Deploying frontend and ingress..."
kubectl apply -f "$MANIFESTS_DIR/$([ "$TARGET" = "aws" ] && echo "02" || echo "05")-$([ "$TARGET" = "aws" ] && echo "frontend-ingress-hpa" || echo "frontend-ingress").yaml"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Pod status:"
kubectl get pods -n $NAMESPACE

echo ""
echo "🌐 Services:"
kubectl get services -n $NAMESPACE

echo ""
echo "🔗 Ingress:"
kubectl get ingress -n $NAMESPACE
