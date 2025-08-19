import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";
import loginLogo from "../assets/imgs/sgp02.jpeg";
import { auto } from "@popperjs/core";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.classList.add("login-background");
    return () => {
      document.body.classList.remove("login-background");
    };
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("usuarioLogado", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      const users = JSON.parse(localStorage.getItem("usuarios")) || [];
      const user = users.find(
        (u) => u.email === form.email && u.password === form.password
      );
      if (user) {
        localStorage.setItem("usuarioLogado", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        alert(err.response?.data || "E‑mail ou senha inválidos.");
      }
    }
  };

  return (
  <div className="login-wrapper">
      <div className="login-container">
        <img src={loginLogo} alt="Logo Sistema" style={{ width: 200, marginBottom: 20, display: "block", margin: auto  }} />
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="E‑mail"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="password-field">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword((v) => !v)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button type="submit">Entrar</button>
        </form>
        <p>
          Não tem uma conta? <Link to="/register">Cadastre‑se</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
