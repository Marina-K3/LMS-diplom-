import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChalkboardUser } from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const value = props.page;
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("profileImage");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <nav>
        <div className="logo1">
          <img src={logo} alt="" />
        </div>
        <div className="navigation">
          <div id="menu-btn">
            <div className="menu-dash" onClick={toggleMobileMenu}>
              &#9776;
            </div>
          </div>
          <i
            id="menu-close"
            className="fas fa-times"
            onClick={closeMobileMenu}
          ></i>
          <ul className={isMobileMenuOpen ? "active" : ""}>
            {isMobileMenuOpen && (
              <li className="close-button">
                <button onClick={closeMobileMenu}>X</button>
              </li>
            )}
            {value === "home" ? (
              <li style={{ backgroundColor: "#fd7500", borderRadius: "5px" }}>
                <Link to={"/"} style={{ color: "white", padding: "10px" }}>
                  Главная
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/"}>Главная</Link>
              </li>
            )}
            {value === "courses" ? (
              <li style={{ backgroundColor: "#fd7500", borderRadius: "5px" }}>
                <Link
                  to={"/courses"}
                  style={{ color: "white", padding: "10px" }}
                >
                  Курсы
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/courses"}>Курсы</Link>
              </li>
            )}
            {authToken ? (
              value === "profile" ? (
                <li style={{ backgroundColor: "#fd7500", borderRadius: "5px" }}>
                  <Link
                    to={"/profile"}
                    style={{ color: "white", padding: "10px" }}
                  >
                    Профиль
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to={"/profile"}>
                    Профиль
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
              )
            ) : (
              <></>
            )}
            {authToken ? (
              value === "learnings" ? (
                <li style={{ backgroundColor: "#fd7500", borderRadius: "5px" }}>
                  <Link
                    to={"/learnings"}
                    style={{ color: "white", padding: "10px" }}
                  >
                    Обучение
                    <FontAwesomeIcon icon={faChalkboardUser} />
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to={"/learnings"}>
                    Обучение
                    <FontAwesomeIcon icon={faChalkboardUser} />
                  </Link>
                </li>
              )
            ) : (
              <></>
            )}
            {authToken !== null ? (
              <li>
                <button onClick={handleLogOut} className="sign-out-button">
                  Выйти
                </button>
              </li>
            ) : (
              <li>
                <button onClick={() => navigate("/login")}>Войти</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
