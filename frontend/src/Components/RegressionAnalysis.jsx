import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './css/regression.css';
import Navbar from "./Navbar"; //  CSS

const RegressionAnalysis = () => {
    const [trainingHours, setTrainingHours] = useState(20); // По умолчанию 20 часов
    const [regressionResult, setRegressionResult] = useState({
        slope: 0,
        intercept: 0,
        predictedValue: 0
    });

    // Функция для отправки запроса на сервер и получения данных
    const handleAnalyze = () => {
        fetch(`http://localhost:8080/api/regression/analyze?trainingHours=${trainingHours}`)
            .then((response) => response.json())
            .then((data) => setRegressionResult(data))
            .catch((error) => console.error("Error fetching data: ", error));
    };

    return (
        <div>
            <div> <Navbar page={"home"} /></div>
        <div className="regression-container">
            <h1 className="title">Отчёт по регрессионному анализу</h1>

            {/* Форма для ввода данных */}
            <div className="input-container">
                <h3>Введите количество часов тренинга для анализа (X):</h3>
                <div className="input-wrapper">
                    <input
                        type="number"
                        value={trainingHours}
                        onChange={(e) => setTrainingHours(e.target.value)}
                        min="1"
                        step="1"
                    />
                    <button onClick={handleAnalyze}>Рассчитать</button>
                </div>
            </div>

            {/* Отображение уравнения регрессии */}
            <div className="equation-container">
                <h3>Уравнение регрессии</h3>
                <p>
                    <strong>y = {regressionResult.intercept.toFixed(2)} + {regressionResult.slope.toFixed(2)} * X</strong>
                </p>
                <div className="explanation">
                    <div>
                        <strong>y:</strong> Прогнозируемое значение прироста производительности.
                    </div>
                    <div>
                        <strong>X:</strong> Количество часов тренинга.
                    </div>
                    <div>
                        <strong>Перехват (intercept):</strong> {regressionResult.intercept.toFixed(2)} — это значение прироста производительности, когда количество часов тренинга равно нулю.
                    </div>
                    <div>
                        <strong>Наклон (slope):</strong> {regressionResult.slope.toFixed(2)} — величина прироста производительности на каждый дополнительный час тренинга.
                    </div>
                </div>
            </div>

            {/* Прогнозируемые результаты */}
            <div className="results-container">
                <h3>Прогнозируемые результаты</h3>
                <p>
                    На основе анализа данных, если сотрудник будет обучаться в течение {trainingHours} часов, ожидается увеличение производительности на{" "}
                    <strong>{regressionResult.predictedValue.toFixed(3)}</strong> единиц.
                </p>
                <p>
                    Это указывает на то, что обучение оказывает значительное влияние на улучшение производственных показателей.
                </p>
            </div>

            {/* График */}
            <div className="chart-container">
                <h3>График зависимости производительности от количества часов тренинга</h3>
                <ResponsiveContainer width="60%" height={200}>
                    <LineChart
                        data={[
                            { trainingHours: 10, performanceIncrease: 30 },
                            { trainingHours: 15, performanceIncrease: 45 },
                            { trainingHours: 20, performanceIncrease: 60 },
                            { trainingHours: 25, performanceIncrease: 75 },
                        ]}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="trainingHours" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="performanceIncrease" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
        </div>
    );
};

export default RegressionAnalysis;
