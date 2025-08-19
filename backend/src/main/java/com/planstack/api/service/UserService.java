package com.planstack.api.service;

import com.planstack.api.model.User;
import com.planstack.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    
    public List<User> listAll() {
        return repo.findAll();
    }


    public User findById(Long id) {
        return repo.findById(id)
                   .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado: " + id));
    }


    public User create(User user) {
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado: " + user.getEmail());
        }
        return repo.save(user);
    }


    public User update(Long id, User updated) {
        User existing = findById(id);
        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());
        return repo.save(existing);
    }


    public void delete(Long id) {
        repo.delete(findById(id));
    }
}
