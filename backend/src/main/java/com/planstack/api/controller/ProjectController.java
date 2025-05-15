package com.planstack.api.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planstack.api.model.Project;
import com.planstack.api.service.ProjectService;
import com.planstack.api.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/project")
public class ProjectController {
    @Autowired
    ProjectService projectService;
    @Autowired
    UserService userService;

@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody @Valid Project project, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
        ArrayList<String> errors = new ArrayList<>();
        for (ObjectError elem : bindingResult.getAllErrors()) {
            errors.add(elem.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(errors);
    }
    if (userService.isExist(project.user.id)) {
        project = projectService.register(project);
        return ResponseEntity.ok(project);
    } else {
        return ResponseEntity.badRequest().body("O gestor não existe.");
    }
}
    
}
