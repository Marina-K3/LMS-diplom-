package com.example.demo.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String location;
    private String phoneNumber;
    private int numberOfEmployees;
    private String headOfDepartment;
    private boolean isBudgetApproved;

    @OneToMany(mappedBy = "department")
    private List<User> employees;
}
