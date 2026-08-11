package com.webdev.project.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "projects")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Project {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false, length = 2000)
    private String description;

    @ElementCollection
    @CollectionTable(name = "project_tech_stack", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "technology")
    private List<String> techStack;

    @Enumerated(EnumType.STRING)
    private Status status = Status.IN_PROGRESS;

    private String clientName;
    private String thumbnailUrl;

   @Column(columnDefinition = "DATETIME(6)")
   @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(columnDefinition = "DATETIME(6)")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime completedAt;

    public enum Status { IN_PROGRESS, LIVE, ARCHIVED }
}
