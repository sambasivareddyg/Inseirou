package com.webdev.contact.service;

import com.webdev.contact.dto.ContactRequestDto;
import com.webdev.contact.kafka.ContactAuditProducer;
import com.webdev.contact.model.ContactRequest;
import com.webdev.contact.repository.ContactRepository;

import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final ContactRepository contactRepository;
    private final ContactAuditProducer auditProducer;
    @Inject
    private EmailSender emailSender;
    @Transactional
    @CacheEvict(value = "contacts", allEntries = true)
    public ContactRequest submitContact(ContactRequestDto dto) {
        ContactRequest request = ContactRequest.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .company(dto.getCompany())
                .service(dto.getService())
                .message(dto.getMessage())
                .status(ContactRequest.Status.NEW)
                .build();
        ContactRequest saved = contactRepository.save(request);
        auditProducer.publishEvent("CONTACT_SUBMITTED", saved.getId().toString(), dto.getEmail());
        log.info("Contact request submitted by: {}", dto.getEmail());
        emailSender.sendEmail("New contact request submitted by: " + dto.getEmail() + "\nName: " + dto.getName() + "\nPhone: " + dto.getPhone() + "\nCompany: " + dto.getCompany() + "\nService: " + dto.getService() + "\nMessage: " + dto.getMessage());
        return saved;
    }

    @Cacheable(value = "contacts", key = "'all'")
    public List<ContactRequest> getAllContacts() {
        return contactRepository.findAll();
    }

    @Cacheable(value = "contacts", key = "#status")
    public List<ContactRequest> getContactsByStatus(String status) {
        return contactRepository.findByStatus(ContactRequest.Status.valueOf(status.toUpperCase()));
    }
}
