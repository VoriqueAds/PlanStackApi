import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectList.css";

function ProjectList() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("projetos")) || [];
    setProjetos(dados);

    document.body.classList.remove('login-background');
  }, []);

  return (
    <div className="project-list-wrapper p-5">
      <h2 className="text-center text-primary mb-4">Projetos Cadastrados</h2>

      {projetos.length === 0 ? (
        <p className="text-center text-muted">Nenhum projeto cadastrado ainda.</p>
      ) : (
        <div className="row">
          {projetos.map((proj) => (
            <div key={proj.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm rounded-4 p-3">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{proj.nome}</h5>
                  <p className="card-text flex-grow-1">{proj.descricao}</p>
                  <p>
                    <strong>Status:</strong> {proj.status}
                  </p>
                  <Link
                    to={`/projetos/${proj.id}`}
                    className="btn btn-outline-primary rounded-pill mt-auto"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;
