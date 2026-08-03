package com.webdev.contact.repository;

import com.webdev.contact.model.ContactRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactRepository extends JpaRepository<ContactRequest, Long> {
    List<ContactRequest> findByStatus(ContactRequest.Status status);
    List<ContactRequest> findByEmailOrderByCreatedAtDesc(String email);
}
