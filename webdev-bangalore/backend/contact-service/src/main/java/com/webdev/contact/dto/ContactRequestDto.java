package com.webdev.contact.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ContactRequestDto {
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Valid email required")
    @NotBlank
    private String email;

    private String phone;
    private String company;
    private String service;

    @NotBlank(message = "Message is required")
    @Size(min = 10, max = 2000)
    private String message;
}
