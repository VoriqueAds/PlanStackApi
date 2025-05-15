package com.planstack.api.service;

import com.planstack.api.model.Activity;
import com.planstack.api.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    private final ActivityRepository repository;

    public ActivityService(ActivityRepository repository) {
        this.repository = repository;
    }

    public List<Activity> findAll() {
        return repository.findAll();
    }

    public Optional<Activity> findById(Long id) {
        return repository.findById(id);
    }

    public Activity save(Activity activity) {
        return repository.save(activity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
