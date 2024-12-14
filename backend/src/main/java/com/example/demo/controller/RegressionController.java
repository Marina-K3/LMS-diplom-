package com.example.demo.controller;

import com.example.demo.entity.RegressionResult;
import com.example.demo.service.RegressionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/regression")
public class RegressionController {

    @Autowired
    private RegressionService regressionService;

    @GetMapping("/analyze")
    public ResponseEntity<RegressionResult> analyze(@RequestParam double trainingHours) {
        RegressionResult result = regressionService.performRegressionAnalysis(trainingHours);
        return ResponseEntity.ok(result);
    }
}
