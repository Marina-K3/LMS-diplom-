import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import Navbar from "./Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setUser } = useUserContext();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);

        // Разбираем данные из токена
        const tokenParts = data.token.split(", ");
        const role = tokenParts.find((part) => part.startsWith("role=")).split("=")[1];

        // Получение пользовательских данных (опционально)
        const userDetailsResponse = await fetch(
            `http://localhost:8080/api/users/details?email=${email}`
        );

        if (userDetailsResponse.ok) {
          const userDetails = await userDetailsResponse.json();
          localStorage.setItem("name", userDetails.username);
          localStorage.setItem("id", userDetails.id);
          setUser({ name: userDetails.username, email, id: userDetails.id, role });

          // Редирект по роли
          if (role === "admin") {
            navigate("/dashboard");
          } else if (role === "hr") {
            navigate("/dashboard");
          } else if (role === "employee") {
            navigate("/courses");
          } else {
            setError("Invalid user role.");
          }
        } else {
          setError("An error occurred while fetching user details.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Invalid email or password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };


  return (
    <div>
      <Navbar />
      <div className="auth">
        <div className="container">
          <h3>Приветствуем!</h3>
          <br></br>
          <h2>Вход</h2>
          <br />
          <form autoComplete="off" className="form-group" onSubmit={login}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              style={{ width: "100%", marginRight: "50px" }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <br />
            <label htmlFor="password">Пароль: </label>
            <input
              type="password"
              className="form-control"
              style={{ width: "100%" }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <br />
            <div className="btn1">
              <button type="submit" className="btn btn-success btn-md mybtn">
                LOGIN
              </button>
            </div>
          </form>
          {error && <span className="error-msg">{error}</span>}
          <br />
          <span>
            Нет аккаунта?
            <Link to="/register"> Регистрация</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Login;
