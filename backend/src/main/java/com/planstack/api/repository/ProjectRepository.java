package com.planstack.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.planstack.api.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long>{
    
}
