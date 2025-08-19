import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";
import loginLogo from "../assets/imgs/sgp02.jpeg";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const resp = await api.post("/auth/register", form);
      const novoUsuario = resp.data;

      localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
      alert("Usuário cadastrado com sucesso!");
      navigate("/");

    } catch {
      console.warn("Falha na API. Salvando localmente...");

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      if (usuarios.find((u) => u.email === form.email)) {
        return alert("Este e‑mail já está cadastrado.");
      }

      const novoUsuario = { ...form, id: Date.now() };
      usuarios.push(novoUsuario);

      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));

      alert("Usuário cadastrado localmente com sucesso!");
      navigate("/");
    }
  };

  return (
  <div className="register-wrapper">
    <div className="register-container">
      <img src={loginLogo} alt="Logo Sistema" style={{ width: 120, marginBottom: 20 }} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nome de usuário"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  </div>
);
}

export default Register;
