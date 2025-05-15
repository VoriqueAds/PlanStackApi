package com.planstack.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.planstack.api.model.Project;
import com.planstack.api.repository.ProjectRepository;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;

    public boolean isExist(Long id) {
        return projectRepository.existsById(id);
    }

    public Project register(Project project) {
        return projectRepository.save(project);
    }

    public Project update(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> list() {
        return projectRepository.findAll();
    }

    public Optional<Project> findById(Long id) {
        return projectRepository.findById(id);
    }

    public void remove(Long id) {
        if (isExist(id)) {
            projectRepository.deleteById(id);
        }
    }

    public ResponseEntity<?> remove2(Long id) {
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body("O ID deverá ser superior a ZERO.");
        }
        if (isExist(id)) {
            remove(id);
            return ResponseEntity.ok("Projeto removido com sucesso.");
        } else {
            return ResponseEntity.badRequest().body("O ID informado não existe.");
        }
    }
}
