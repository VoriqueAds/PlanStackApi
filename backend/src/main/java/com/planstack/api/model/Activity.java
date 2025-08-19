package com.planstack.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity(name = "activity")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome da atividade deve ser informado.")
    @Column(name = "name", columnDefinition = "varchar(100)", nullable = false)
    private String name;

    @Size(max = 300, message = "A descrição não pode ultrapassar 300 caracteres.")
    @Column(name = "description", columnDefinition = "varchar(300)", nullable = true)
    private String description;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    public Activity() {
    }

    public Activity(Long id, String name, String description, Project project) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.project = project;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
