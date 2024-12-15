import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ImgUpload from "./ImgUpload";
import Performance from "./DashBoard/Performance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';

function Profile() {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const [userDetails, setUserDetails] = useState(null);
    const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }

        async function fetchUserDetails() {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user details.");
                }
                const data = await response.json();
                console.log(data.profile_image);
                setUserDetails(data);

                // Если профильное изображение отсутствует в localStorage, обновите состояние
                const imageUrl = `http://localhost:8080${data.profile_image}`;
                setProfileImage(imageUrl);
                localStorage.setItem("profileImage", imageUrl);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchUserDetails();
    }, [authToken, navigate, id]);

    useEffect(() => {
        // Если в localStorage есть изображение профиля, обновляем состояние
        const savedProfileImage = localStorage.getItem("profileImage");
        if (savedProfileImage) {
            setProfileImage(savedProfileImage);
        }
    }, []);

    const handleImageChange = async (file) => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post(`http://localhost:8080/api/users/${id}/uploadProfileImage`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${authToken}`,
                    },
                });

                const imageUrl = `http://localhost:8080/uploads/${response.data.filename}`;
                setProfileImage(imageUrl);
                localStorage.setItem("profileImage", imageUrl);  // Сохраняем новый путь изображения
            } catch (error) {
                console.error("Ошибка загрузки изображения:", error);
            }
        }
    };

    return (
        <div>
            <Navbar page={"profile"} />
            <div className="profile-card" id="pbg" style={{ marginTop: '3%' }}>
                <ImgUpload onChange={handleImageChange} src={profileImage} />
                <h2 className="profile-name">{userDetails?.username}</h2>
                <div style={{ marginTop: '20px' }}>
                    <h4>Email: </h4>
                    <p className="profile-email">{userDetails?.email}</p>
                </div>
                <div>
                    <h4>Телефон: </h4>
                    <p className="profile-phno">{userDetails?.phno}</p>
                </div>
                <div>
                    <h4>Гендер: </h4>
                    <p className="profile-gender">{userDetails?.gender}</p>
                </div>
                <div>
                    <h4>Дата рождения: </h4>
                    <p className="profile-dob">{userDetails?.dob}</p>
                </div>
                <div>
                    <h4>Профессия: </h4>
                    <p className="profile-gender">{userDetails?.profession}</p>
                </div>
                <div>
                    <h4>Курсы: </h4>
                    <p className="profile-phno">{userDetails?.learningCourses.length}</p>
                </div>
                <div
                    style={{
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <a
                        href={userDetails?.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            marginRight: '15px',
                            color: '#0077B5',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'color 0.3s ease',
                        }}
                        onMouseOver={(e) => e.target.style.color = '#004471'}
                        onMouseOut={(e) => e.target.style.color = '#0077B5'}
                    >
                        <FontAwesomeIcon icon={faLinkedin} className="social-icon" style={{ fontSize: '38px' }} />
                    </a>
                    <a
                        href={userDetails?.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: 'darkviolet',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'color 0.3s ease',
                        }}
                        onMouseOver={(e) => e.target.style.color = '#000'}
                        onMouseOut={(e) => e.target.style.color = 'darkviolet'}
                    >
                        <FontAwesomeIcon icon={faGithub} className="social-icon" style={{ fontSize: '38px' }} />
                    </a>
                </div>
            </div>
            <Performance />
        </div>
    );
}

export default Profile;
