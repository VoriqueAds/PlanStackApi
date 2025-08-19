import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));

  const handleLogout = () => {
    localStorage.removeItem("userLogged");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          PlanStack
        </Link>

        <div className="d-flex align-items-center ms-auto">
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                Projetos
              </Link>
            </li>

            {userLogged ? (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userLogged.username || "Usuário"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Sair
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
