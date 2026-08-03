package com.webdev.project.kafka;

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
public class ProjectAuditProducer {
    private static final String TOPIC = "audit-log";
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishEvent(String action, String entityId, String performedBy) {
        Map<String, Object> event = new HashMap<>();
        event.put("action", action);
        event.put("entity", "projects");
        event.put("entityId", entityId);
        event.put("performedBy", performedBy);
        event.put("service", "project-service");
        event.put("timestamp", Instant.now().toString());
        kafkaTemplate.send(TOPIC, entityId, event);
    }
}
