package com.planstack.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity(name = "projeto")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "O nome deve ser informado.")
    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    @Size(max=300, message="A descrição não pode ultrapassar 300 caracteres")
    @Column(name = "descricao", length = 300)
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "gestor_id")
    private User user;

    // getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
