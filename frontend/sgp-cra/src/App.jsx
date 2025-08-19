import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import ProjectList from "./Pages/ProjectList";
import ProjectRecord from "./Pages/ProjectRecord";
import ProjectDetails from "./Pages/ProjectDetails";
import Header from "./Components/Header";

import "./App.css";

function AppRoute() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const hideHeader = ["/", "/register"].includes(location.pathname);
  const isLogged = !!localStorage.getItem("usuarioLogado");

  if (!isLogged && !["/", "/register"].includes(location.pathname)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/new" element={<ProjectRecord />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route
          path="*"
          element={<Navigate to={isLogged ? "/dashboard" : "/"} />}
        />
      </Routes>
    </>
  );
}

export default AppRoute;
