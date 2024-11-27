package com.example.demo.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Другие поля роли
    private String name;

    @OneToMany(mappedBy = "role")
    private List<User> users;
}
