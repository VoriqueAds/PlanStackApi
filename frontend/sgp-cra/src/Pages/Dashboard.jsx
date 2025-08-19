import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

import { FaChartLine, FaClipboardList, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    activeProjects: 0,
    pendingTasks: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    const activeProjects = projetos.filter(p => p.status !== 'Concluído' && p.status !== 'Cancelado').length;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const activeUsers = usuarios.length;

    const pendingTasks = projetos.reduce((count, p) => {
      if (p.tasks) {
        count += p.tasks.filter(t => !t.completed).length;
      }
      return count;
    }, 0);

    setMetrics({ activeProjects, pendingTasks, activeUsers });

    document.body.classList.remove('login-background');
  }, []);

  return (
  <div className="dashboard-wrapper">
      <div className="dashboard-container p-5">
        <h1 className="text-center fw-bold text-black-50 mb-4">Painel Principal</h1>
        <p className="lead text-center text-black-50 mb-5">
          Bem-vindo ao <strong>PlanStack</strong>, seu sistema de gestão de projetos.
        </p>

        <div className="dashboard-metrics row g-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow-sm text-center p-4">
              <FaChartLine size={40} className="text-primary mb-3" />
              <h5 className="text-black mb-3" >Projetos Ativos</h5>
              <p className="fs-4 fw-bold">{metrics.activeProjects}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm text-center p-4">
              <FaClipboardList size={40} className="text-warning mb-3" />
              <h5>Tarefas Pendentes</h5>
              <p className="fs-4 fw-bold">{metrics.pendingTasks}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm text-center p-4">
              <FaUsers size={40} className="text-success mb-3" />
              <h5>Usuários Cadastrados</h5>
              <p className="fs-4 fw-bold">{metrics.activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-actions d-flex justify-content-center gap-4">
          <Link to="/projects" className="btn btn-outline-primary btn-lg">
            Ver Projetos
          </Link>
          <Link to="/projects/new" className="btn btn-primary btn-lg">
            + Novo Projeto
          </Link>
        </div>
      </div>
    </div>
  );

};

export default Dashboard;
