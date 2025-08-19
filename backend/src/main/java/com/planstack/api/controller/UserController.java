package com.planstack.api.controller;

import com.planstack.api.model.User;
import com.planstack.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;


    @GetMapping
    public List<User> getAll() {
        return service.listAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }


    @PostMapping
    public ResponseEntity<User> create(@Validated @RequestBody User user) {
        User created = service.create(user);
        return ResponseEntity.ok(created);
    }


    @PutMapping("/{id}")
    public ResponseEntity<User> update(
            @PathVariable Long id,
            @Validated @RequestBody User user
    ) {
        return ResponseEntity.ok(service.update(id, user));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
