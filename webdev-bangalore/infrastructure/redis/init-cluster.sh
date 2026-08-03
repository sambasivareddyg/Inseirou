#!/bin/bash
# Initialize Redis Cluster after all nodes are ready

echo "Waiting for Redis nodes to be ready..."
sleep 10

echo "Creating Redis cluster..."
redis-cli --cluster create \
  redis-node-1:6379 \
  redis-node-2:6379 \
  redis-node-3:6379 \
  redis-node-4:6379 \
  redis-node-5:6379 \
  redis-node-6:6379 \
  --cluster-replicas 1 \
  --cluster-yes

echo "Redis cluster initialized successfully!"
redis-cli --cluster info redis-node-1:6379
