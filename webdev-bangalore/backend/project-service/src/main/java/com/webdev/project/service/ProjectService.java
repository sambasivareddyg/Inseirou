package com.webdev.project.service;

import com.webdev.project.kafka.ProjectAuditProducer;
import com.webdev.project.model.Project;
import com.webdev.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectAuditProducer auditProducer;

    @Cacheable(value = "projects", key = "'all'")
    public List<Project> getAllProjects() {
        log.info("Fetching all projects from DB");
        return projectRepository.findByOrderByCreatedAtDesc();
    }

    @Cacheable(value = "projects", key = "#id")
    public Project getById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));
    }

    @Cacheable(value = "projects", key = "#category")
    public List<Project> getByCategory(String category) {
        return projectRepository.findByCategory(category);
    }

    @Transactional
    @CacheEvict(value = "projects", allEntries = true)
    public Project createProject(Project project) {
        Project saved = projectRepository.save(project);
        auditProducer.publishEvent("PROJECT_CREATED", saved.getId().toString(), "admin");
        return saved;
    }

    @Transactional
    @CacheEvict(value = "projects", allEntries = true)
    public Project updateProject(Long id, Project updated) {
        Project existing = getById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setCategory(updated.getCategory());
        existing.setStatus(updated.getStatus());
        existing.setTechStack(updated.getTechStack());
        Project saved = projectRepository.save(existing);
        auditProducer.publishEvent("PROJECT_UPDATED", id.toString(), "admin");
        return saved;
    }

    @Transactional
    @CacheEvict(value = "projects", allEntries = true)
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
        auditProducer.publishEvent("PROJECT_DELETED", id.toString(), "admin");
    }
}
