package com.planstack.api.service;

import com.planstack.api.model.Activity;
import com.planstack.api.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository repo;

    @Autowired
    private ProjectService projectService;

    public List<Activity> listAll() {
        return repo.findAll();
    }

    public List<Activity> listByProject(Long projectId) {
        projectService.findById(projectId);
        return repo.findByProjectId(projectId);
    }

    public Activity findById(Long id) {
        return repo.findById(id)
                   .orElseThrow(() -> new NoSuchElementException("Atividade não encontrada com id " + id));
    }

    public Activity create(Activity activity) {
        var projeto = projectService.findById(activity.getProject().getId());
        activity.setProject(projeto);
        return repo.save(activity);
    }

    public Activity update(Long id, Activity updated) {
        Activity existing = findById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        var projeto = projectService.findById(updated.getProject().getId());
        existing.setProject(projeto);
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.delete(findById(id));
    }
}
