package com.example.demo.repository;

import com.example.demo.entity.TrainingData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingDataRepository extends JpaRepository<TrainingData, Long> {
}

