package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Другие поля роли
    private String name;

//    @OneToMany(mappedBy = "role")
//    private List<User> users;
}
