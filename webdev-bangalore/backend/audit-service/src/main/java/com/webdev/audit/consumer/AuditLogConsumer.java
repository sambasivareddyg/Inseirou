package com.webdev.audit.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webdev.audit.model.AuditLog;
import com.webdev.audit.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuditLogConsumer {

    private final AuditLogRepository auditLogRepository;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "audit-log", groupId = "audit-service-group",
                   containerFactory = "kafkaListenerContainerFactory")
    public void consume(@Payload Map<String, Object> event,
                        @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
                        @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
                        @Header(KafkaHeaders.OFFSET) long offset) {
        try {
            log.info("Received audit event from topic={} partition={} offset={}: {}",
                     topic, partition, offset, event.get("action"));

            AuditLog log_entry = AuditLog.builder()
                    .action(String.valueOf(event.getOrDefault("action", "UNKNOWN")))
                    .entity(String.valueOf(event.getOrDefault("entity", "")))
                    .entityId(String.valueOf(event.getOrDefault("entityId", "")))
                    .performedBy(String.valueOf(event.getOrDefault("performedBy", "")))
                    .service(String.valueOf(event.getOrDefault("service", "")))
                    .timestamp(LocalDateTime.now())
                    .metadata(objectMapper.writeValueAsString(event))
                    .build();

            auditLogRepository.save(log_entry);
            log.info("Audit log persisted: id={}", log_entry.getId());

        } catch (Exception e) {
            log.error("Error processing audit event: {}", e.getMessage(), e);
        }
    }
}
