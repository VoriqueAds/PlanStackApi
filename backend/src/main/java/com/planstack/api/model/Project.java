package com.planstack.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


@Entity(name = "projeto")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    
    @NotNull(message = "O nome deve ser informado.")
    @Column(name = "nome", columnDefinition = "varchar(100)", nullable = false)
    private String nome;


    @Size(max=300, message="A descrição não pode ultrapassar a 300 caracteres")
    @Column(name = "decricao", columnDefinition = "varchar(300)", nullable = true)
    public String descricao;

    @ManyToOne
    @JoinColumn(name = "gestor_id")
    public User user;
}
