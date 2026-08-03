package com.webdev.project.repository;

import com.webdev.project.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByCategory(String category);
    List<Project> findByStatus(Project.Status status);
    List<Project> findByOrderByCreatedAtDesc();
}
