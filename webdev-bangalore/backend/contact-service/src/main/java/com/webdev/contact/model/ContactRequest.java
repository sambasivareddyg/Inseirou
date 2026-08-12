package com.webdev.contact.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_requests")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ContactRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;
    private String company;
    private String service;

    @Column(nullable = false)
    private String message;

    @Enumerated(EnumType.STRING)
    private Status status = Status.NEW;

    @org.hibernate.annotations.CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum Status { NEW, IN_PROGRESS, CLOSED }
}
