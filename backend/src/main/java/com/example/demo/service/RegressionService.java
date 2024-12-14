package com.example.demo.service;

import com.example.demo.entity.RegressionResult;
import com.example.demo.entity.TrainingData;
import com.example.demo.repository.TrainingDataRepository;
import org.apache.commons.math3.stat.regression.SimpleRegression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class RegressionService {

    @Autowired
    private TrainingDataRepository repository;

    public RegressionResult performRegressionAnalysis(double trainingHours) {
        List<TrainingData> data = repository.findAll();

        double[] x = data.stream().mapToDouble(TrainingData::getTrainingHours).toArray();
        double[] y = data.stream().mapToDouble(TrainingData::getPerformanceIncrease).toArray();

        // Простая линейная регрессия с Apache Commons Math
        SimpleRegression regression = new SimpleRegression();
        for (int i = 0; i < x.length; i++) {
            regression.addData(x[i], y[i]);
        }

        double slope = regression.getSlope();
        double intercept = regression.getIntercept();
        double predictedValue = regression.predict(trainingHours);

        return new RegressionResult(slope, intercept, predictedValue);
    }
}


