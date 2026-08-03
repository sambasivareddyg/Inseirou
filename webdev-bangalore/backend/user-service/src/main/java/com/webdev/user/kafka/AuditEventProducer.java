package com.webdev.user.kafka;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuditEventProducer {

    private static final String TOPIC = "audit-log";
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishAuditEvent(String action, String entity, String entityId, String performedBy) {
        Map<String, Object> event = new HashMap<>();
        event.put("action", action);
        event.put("entity", entity);
        event.put("entityId", entityId);
        event.put("performedBy", performedBy);
        event.put("service", "user-service");
        event.put("timestamp", Instant.now().toString());

        kafkaTemplate.send(TOPIC, entityId, event);
        log.info("Audit event published: {} {} {}", action, entity, entityId);
    }
}
