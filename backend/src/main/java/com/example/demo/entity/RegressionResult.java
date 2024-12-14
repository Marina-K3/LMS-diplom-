package com.example.demo.entity;

public class RegressionResult {
    private double slope;
    private double intercept;
    private double predictedValue;

    public RegressionResult(double slope, double intercept, double predictedValue) {
        this.slope = slope;
        this.intercept = intercept;
        this.predictedValue = predictedValue;
    }

    // Геттеры и сеттеры
    public double getSlope() { return slope; }
    public void setSlope(double slope) { this.slope = slope; }

    public double getIntercept() { return intercept; }
    public void setIntercept(double intercept) { this.intercept = intercept; }

    public double getPredictedValue() { return predictedValue; }
    public void setPredictedValue(double predictedValue) { this.predictedValue = predictedValue; }
}

