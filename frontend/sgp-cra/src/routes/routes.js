import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Page404 from "../pages/Page404/page404";
import ProjectRecord from "../pages/ProjectRecord/ProjectRecord";
import ProjectList from "../pages/ProjectList/ProjectList";
import ProjectDetails from "../pages/ProjectDetails/ProjectDetails";
import Register from "../pages/Register/Register";

function Paths() {
  console.log("Paths.js: Iniciando rotas...");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<Dashboard />} />
        <Route path="/projetos" element={<ProjectList />} />
        <Route path="/projetos/novo" element={<ProjectRecord />} />
        <Route path="/projetos/:id" element={<ProjectDetails />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Paths;
