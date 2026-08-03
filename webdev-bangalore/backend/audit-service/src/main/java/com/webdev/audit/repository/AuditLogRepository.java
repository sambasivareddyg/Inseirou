package com.webdev.audit.repository;

import com.webdev.audit.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByEntityOrderByTimestampDesc(String entity);
    List<AuditLog> findByPerformedByOrderByTimestampDesc(String performedBy);
    Page<AuditLog> findByServiceOrderByTimestampDesc(String service, Pageable pageable);
}
