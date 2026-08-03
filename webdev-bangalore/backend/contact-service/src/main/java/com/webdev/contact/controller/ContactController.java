package com.webdev.contact.controller;

import com.webdev.contact.dto.ContactRequestDto;
import com.webdev.contact.model.ContactRequest;
import com.webdev.contact.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> submit(@Valid @RequestBody ContactRequestDto dto) {
        ContactRequest saved = contactService.submitContact(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("success", true, "id", saved.getId(), "message", "Thank you! We'll be in touch shortly."));
    }

    @GetMapping
    public ResponseEntity<List<ContactRequest>> getAll() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ContactRequest>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(contactService.getContactsByStatus(status));
    }
}
