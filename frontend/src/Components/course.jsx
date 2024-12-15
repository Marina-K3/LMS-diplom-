import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Forum from "./forum";
import ReactPlayer from "react-player";
import { Progress } from "antd";
import { Button, Modal } from "antd";
import Feedback from "./Feedback";

const Course = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [course, setCourse] = useState({
        course_name: "",
        instructor: "",
        price: null,
        description: "",
        y_link: "",
        p_link: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [duration, setDuration] = useState(null);
    const [played, setPlayed] = useState(0);
    const [changePlayed, setChangePlayed] = useState(0);
    const [userId, setUserId] = useState(localStorage.getItem("id"));
    const [popup, setPopup] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const courseId = location.pathname.split("/")[2];
    const playerRef = useRef(null);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/courses/${courseId}`
                );
                const fetchedCourse = response.data;
                setCourse(fetchedCourse);
                setLoading(false);
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        }
        fetchCourse();
    }, [courseId]);

    const handleDuration = () => {
        setDuration(playerRef.current.getDuration());
        if (duration !== 0) {
            fetch("http://localhost:8080/api/progress/update-duration", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    courseId,
                    duration,
                }),
            });
        }
    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/progress/${userId}/${courseId}`)
            .then((response) => response.json())
            .then((data) => {
                setPlayed(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    useEffect(() => {
        const updateProgress = async () => {
            if (courseId && userId) {
                try {
                    const response = await fetch(
                        "http://localhost:8080/api/progress/update-progress",
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                userId,
                                courseId,
                                playedTime: played,
                                duration,
                            }),
                        }
                    );

                    if (response.ok) {
                        setPlayed(changePlayed < played ? played : changePlayed);
                    } else {
                        console.error("Error updating progress:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error updating progress:", error);
                }
            }
        };

        updateProgress();
    }, [changePlayed]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Что-то пошло не так!</div>;
    }
    return (
        <div>
            <h3
                style={{
                    textAlign: "center",
                    color: "white",
                    padding: "10px",
                    fontSize: "900",
                    fontStyle: "italic",
                    backgroundColor: "darkblue",
                    width: "100%",
                    height: "-19px",
                }}
            >
                Завершённые курсы {course.course_name} - 2024
            </h3>
            <div
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "30px",
                }}
            >
                <div key={courseId} className="course">
                    <div style={{ display: "flex", gap: "20px" }}>
                        <ReactPlayer
                            ref={playerRef}
                            onProgress={(Progress) => {
                                if (changePlayed + 10 <= Progress.playedSeconds) {
                                    setChangePlayed(Progress.playedSeconds);
                                }
                            }}
                            url={course.y_link}
                            controls
                            type="video/mp4"
                            width="60%"
                            height="440px"
                            onDuration={handleDuration}
                            played={played}
                            style={{
                                boxShadow: "0 0 20px rgba(0, 0, 0, 0.52)",
                                padding: "8px",
                                backgroundColor: "darkgrey",
                                borderRadius: "10px",
                            }}
                        />
                        <div
                            style={{
                                width: "50%",
                                boxShadow: "0 0 20px rgba(0, 0, 0, 0.52)",
                                borderRadius: "10px",
                            }}
                        >
                            <h4>Формат курса:</h4>
                            <p>
                                Это курс с самостоятельным обучением, состоящий из видео-лекций,
                                практических заданий и тестов. Вы можете завершить курс в
                                удобном для вас темпе в течение 8 недель.
                            </p>

                            <h4>Требования:</h4>
                            <p>
                                Предварительный опыт программирования не требуется, но
                                рекомендуется базовая компьютерная грамотность.
                            </p>
                            <h4>Кому подойдёт этот курс:</h4>
                            <ul>
                                <li>Новичкам, желающим изучить программирование.</li>
                                <li>
                                    Тем, кто хочет добавить {course.course_name} в свой набор
                                    навыков.
                                </li>
                                <li>Студентам, готовящимся к курсам по информатике.</li>
                            </ul>
                            <h4>Оцените себя:</h4>
                            <p>
                                Тесты разработаны для укрепления ваших знаний и предоставления
                                ценной обратной связи о вашем прогрессе в курсе.
                            </p>
                            <p>
                                Нажмите на кнопку <b>"Пройти тест"</b>, чтобы начать
                                тестирование.
                            </p>

                            {Math.ceil((played / duration) * 100) >= 98 && (
                                <button
                                    className="enroll-button"
                                    onClick={() => navigate(`/assessment/${course.course_id}`)}
                                >
                                    Пройти тест
                                </button>
                            )}
                            {Math.ceil((played / duration) * 100) < 98 && (
                                <button className="enroll-button-deactive" onClick={showModal}>
                                    Пройти тест
                                </button>
                            )}
                        </div>
                    </div>

                    <h4
                        style={{
                            marginTop: "20px",
                            boxShadow: "0 0 20px rgba(0, 0, 0, 0.52)",
                            borderRadius: "10px",
                        }}
                    >
                        Описание: <span style={{ fontStyle: "italic", color: "grey" }}>{course.description}</span>
                    </h4>

                    <p
                        style={{
                            width: "85%",
                            marginBottom: "10px",
                            textAlign: "center",
                            margin: "0 auto",
                            display: "flex",
                            alignItems: "center",
                            marginTop: "20px",
                        }}
                    >
                        Этот онлайн-курс по программированию предоставляет
                        всестороннее введение в {course.course_name}. Независимо от того,
                        являетесь ли вы новичком или хотите расширить свои навыки, этот курс
                        охватывает основы {course.course_name} и готовит вас к более сложным
                        задачам.
                    </p>
                    <h4 style={{ marginBottom: "10px" }}>Преподаватель: {course.instructor}</h4>
                    <h4>Тип контента: Видео</h4>
                    <div>
                        <button
                            className="enroll-button"
                            onClick={() => navigate("/learnings")}
                        >
                            Назад
                        </button>
                        <Modal
                            title="Примечание:"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <p
                                style={{ color: "black", fontWeight: "bold", fontSize: "15px" }}
                            >
                                Завершите 100% курса, чтобы пройти тест.
                            </p>
                        </Modal>

                        {popup && (
                            <p
                                style={{
                                    backgroundColor: "#017bff",
                                    width: "30%",
                                    padding: "8px",
                                    borderRadius: "10px",
                                    color: "white",
                                    marginLeft: "703px",
                                    marginTop: "10px",
                                }}
                            >
                                Завершите 100% курса, чтобы пройти тест.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="pro-report">
                <div className="progress-report-section">
                    <div className="progress-section">
                        <h3 className="section-title">Прогресс:</h3>
                        <Progress
                            percent={Math.ceil((played / duration) * 100)}
                            status="active"
                            strokeColor={{
                                "0%": "#108ee9",
                                "100%": "#87d068",
                            }}
                            showInfo={false}
                        />
                    </div>
                    <div className="report-section">
                        <h3 className="section-title">Отчёт:</h3>
                        <p className="completion-text">
                            Вы завершили{' '}
                            <span className="completion-percent">
                {Math.ceil((played / duration) * 100)}%
              </span>{' '}
                            курса.
                        </p>
                    </div>
                </div>
            </div>
            <button
                className="enroll-button"
                onClick={() => navigate(`/discussion/${courseId}`)}
            >
                Обсуждение
            </button>
            <Feedback courseid={courseId} />
        </div>
    );
};

export default Course;
