#!/bin/bash
# Create Kafka topics for PixelCraft Studio

KAFKA_BROKER="kafka-1:9092"

echo "Waiting for Kafka to be ready..."
sleep 15

create_topic() {
  local topic=$1
  local partitions=$2
  local replication=$3
  echo "Creating topic: $topic (partitions=$partitions, replication=$replication)"
  kafka-topics.sh --create \
    --bootstrap-server $KAFKA_BROKER \
    --topic $topic \
    --partitions $partitions \
    --replication-factor $replication \
    --if-not-exists \
    --config retention.ms=604800000
}

# Audit log topic - high throughput
create_topic "audit-log" 6 3

# Notification topics
create_topic "contact-notifications" 3 3
create_topic "user-events" 3 3
create_topic "project-events" 3 3

# Dead letter queues
create_topic "audit-log-dlq" 3 2
create_topic "contact-notifications-dlq" 3 2

echo "Listing all topics:"
kafka-topics.sh --list --bootstrap-server $KAFKA_BROKER
echo "Kafka topic setup complete!"
