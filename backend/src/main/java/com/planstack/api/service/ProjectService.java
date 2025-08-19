package com.planstack.api.service;

import com.planstack.api.model.Project;
import com.planstack.api.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository repo;

    public List<Project> listAll() {
        return repo.findAll();
    }

    public Project findById(Long id) {
        return repo.findById(id)
                   .orElseThrow(() -> new NoSuchElementException("Projeto não encontrado com id " + id));
    }

    public Project create(Project project) {
        return repo.save(project);
    }

    public Project update(Long id, Project updated) {
        Project existing = findById(id);
        existing.setNome(updated.getNome());
        existing.setDescricao(updated.getDescricao());
        existing.setUser(updated.getUser());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.delete(findById(id));
    }
}
