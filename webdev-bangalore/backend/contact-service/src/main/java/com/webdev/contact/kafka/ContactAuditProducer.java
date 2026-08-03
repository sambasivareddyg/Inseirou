package com.webdev.contact.kafka;

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
public class ContactAuditProducer {
    private static final String TOPIC = "audit-log";
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishEvent(String action, String entityId, String performedBy) {
        Map<String, Object> event = new HashMap<>();
        event.put("action", action);
        event.put("entity", "contact_requests");
        event.put("entityId", entityId);
        event.put("performedBy", performedBy);
        event.put("service", "contact-service");
        event.put("timestamp", Instant.now().toString());
        kafkaTemplate.send(TOPIC, entityId, event);
        log.info("Audit event sent: {}", action);
    }
}
