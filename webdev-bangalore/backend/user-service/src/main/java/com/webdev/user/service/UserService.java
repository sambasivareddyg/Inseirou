package com.webdev.user.service;

import com.webdev.user.dto.UserDto;
import com.webdev.user.kafka.AuditEventProducer;
import com.webdev.user.model.User;
import com.webdev.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final AuditEventProducer auditEventProducer;

    @Cacheable(value = "users", key = "'all'")
    public List<UserDto> getAllUsers() {
        log.info("Fetching all users from DB");
        return userRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Cacheable(value = "users", key = "#id")
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
        return toDto(user);
    }

    @Transactional
    @CacheEvict(value = "users", allEntries = true)
    public UserDto createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists: " + user.getEmail());
        }
        User saved = userRepository.save(user);
        auditEventProducer.publishAuditEvent("USER_CREATED", "users", saved.getId().toString(), saved.getEmail());
        log.info("Created user: {}", saved.getId());
        return toDto(saved);
    }

    @Transactional
    @CacheEvict(value = "users", allEntries = true)
    public UserDto updateUser(Long id, UserDto dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
        user.setName(dto.getName());
        User saved = userRepository.save(user);
        auditEventProducer.publishAuditEvent("USER_UPDATED", "users", id.toString(), saved.getEmail());
        return toDto(saved);
    }

    @Transactional
    @CacheEvict(value = "users", allEntries = true)
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
        auditEventProducer.publishAuditEvent("USER_DELETED", "users", id.toString(), "system");
    }

    private UserDto toDto(User u) {
        return UserDto.builder()
                .id(u.getId())
                .name(u.getName())
                .email(u.getEmail())
                .role(u.getRole().name())
                .createdAt(u.getCreatedAt().toString())
                .build();
    }
}
