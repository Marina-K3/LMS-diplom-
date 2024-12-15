import React from "react";
import { useUserContext } from "./UserContext";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "./images/logo.png";
import c1 from "./images/c1.jpg";
import c2 from "./images/html.png";
import c3 from "./images/sql.jpg";
import c4 from "./images/python.jpg";
import c5 from "./images/java.png";
import c6 from "./images/css.png";
import "./css/style.css";
import {
  faGraduationCap,
  faAward,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import Footer from "./header and footer/Footer";

function Home() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  return (
    <div>
      <Navbar page={"home"} />

      <div>
        <section id="home">
          <h2>Улучшайте свои знания с помощью LearnSuite</h2>
          <p>
            LearnMasterSuite — это крупный провайдер открытых онлайн-курсов. Программа
            курса разбивает материалы на серию модулей и уроков, которые включают видео, текстовые заметки и тесты для оценки.
          </p>
          <div className="btn">
            <a className="blue" href="#">
              Подробнее
            </a>
            <a className="yellow" href="#">
              Перейти к курсам
            </a>
          </div>
        </section>
        <section id="features">
          <h1>Основные преимущества</h1>
          <p>Шанс улучшить себя</p>
          <div className="fea-base">
            <div className="fea-box">
              <FontAwesomeIcon icon={faGraduationCap} className="i" />
              <h3>Стипендии</h3>
              <p>Оригинальность — основа истинной стипендии.</p>
            </div>
            <div className="fea-box">
              <FontAwesomeIcon icon={faStar} className="i" />
              <h3>Ценные курсы</h3>
              <p>Онлайн-образование — как прилив, поднимающий все лодки.</p>
            </div>
            <div className="fea-box">
              <FontAwesomeIcon icon={faAward} className="i" />
              <h3>Международная сертификация</h3>
              <p>Сертификат без знаний — это как пистолет без пуль в руках.</p>
            </div>
          </div>
        </section>
        <section id="course">
          <h1>Наши популярные курсы</h1>
          <p>10 000+ участников</p>
          <div className="course-box">
            <div className="courses">
              <img src={c1} alt="" />
              <div className="details">
                <p>Обновлено 12.08.23</p>
                <h6>Курс для начинающих по JavaScript</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(239)</p>
                </div>
              </div>
              <div className="cost">₽3,999.00</div>
            </div>
            <div className="courses">
              <img src={c2} alt="" />
              <div className="details">
                <p>Обновлено 12.08.23</p>
                <h6>Полный курс по HTML</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(239)</p>
                </div>
              </div>
              <div className="cost">₽3,999.00</div>
            </div>
            <div className="courses">
              <img src={c3} alt="" />
              <div className="details">
                <p>Обновлено 12.08.23</p>
                <h6>Курс для начинающих по SQL</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(239)</p>
                </div>
              </div>
              <div className="cost">₽3,999.00</div>
            </div>
            <div className="courses">
              <img src={c4} alt="" />
              <div className="details">
                <p>Обновлено 12.08.23</p>
                <h6>Курс мастера Python</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(239)</p>
                </div>
              </div>
              <div className="cost">₽3,999.00</div>
            </div>
          </div>
        </section>
        <section id="registration">
          <div className="reminder">
            <p>Получите доступ к 100 онлайн-курсам бесплатно</p>
            <h1>Зарегистрируйтесь, чтобы получить их</h1>
            <div className="time">
              <div className="date">
                18
                <br /> Дней
              </div>
              <div className="date">
                23
                <br /> Часа
              </div>
              <div className="date">
                06
                <br /> Минут
              </div>
              <div className="date">
                58
                <br /> Секунд
              </div>
            </div>
          </div>
          {!authToken ? (
              <div className="form">
                <h3>Создайте бесплатный аккаунт прямо сейчас!</h3>
                <input type="text" placeholder="Имя" name="" id="" />
                <input type="text" placeholder="Электронная почта" name="" id="" />
                <input type="password" placeholder="Пароль" name="" id="" />
                <input type="number" placeholder="Номер телефона" name="" id="" />
                <div className="btn">
                  <a className="yellow" href="#">
                    Отправить форму
                  </a>
                </div>
              </div>
          ) : (
              <></>
          )}
        </section>
        <Footer />
      </div>

    </div>
  );
}
export default Home;
