package com.planstack.api.controller;

import com.planstack.api.model.Activity;
import com.planstack.api.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private ActivityService service;

    
    @GetMapping
    public List<Activity> getAll() {
        return service.listAll();
    }

    
    @GetMapping("/project/{projectId}")
    public List<Activity> getByProject(@PathVariable Long projectId) {
        return service.listByProject(projectId);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Activity> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    
    @PostMapping
    public ResponseEntity<Activity> create(@Validated @RequestBody Activity activity) {
        var created = service.create(activity);
        return ResponseEntity.ok(created);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<Activity> update(
            @PathVariable Long id,
            @Validated @RequestBody Activity activity
    ) {
        return ResponseEntity.ok(service.update(id, activity));
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
