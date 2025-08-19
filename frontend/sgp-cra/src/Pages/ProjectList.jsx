import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectList.css";

const MOCK_PROJETOS = [
  {
    id: 1,
    nome: "Loft Urbano A & M",
    descricao:
      "Projeto de loft compacto e funcional, com 90m², voltado para jovens profissionais.",
    status: "Executado",
    dataInicio: "2025-09-01",
    dataFim: "2026-01-15",
  },
  {
    id: 2,
    nome: "Casa de Praia C & D",
    descricao: "Residência de veraneio de 200m², com deck e piscina integrada.",
    status: "Executado",
    dataInicio: "2025-10-01",
    dataFim: "2026-02-28",
  },
  {
    id: 3,
    nome: "Apartamento Vista B & L",
    descricao:
      "Apartamento de 120m² com varanda panorâmica, design contemporâneo e ambientes integrados.",
    status: "Planejado",
    dataInicio: "2025-11-15",
    dataFim: "2026-04-30",
  },
  {
    id: 4,
    nome: "Duplex Urbano G & T",
    descricao:
      "Duplex de cobertura de 180m², com espaços sociais amplos e cobertura verde.",
    status: "Planejado",
    dataInicio: "2025-12-10",
    dataFim: "2026-06-15",
  },
  {
    id: 5,
    nome: "Casa Suspensa V & R",
    descricao:
      "Estudo de residência de luxo em platô elevado com vista panorâmica, uso extensivo de madeira e vidro.",
    status: "Em concepção",
    dataInicio: null,
    dataFim: null,
  },
  {
    id: 6,
    nome: "Requalificação da Pousada S & H",
    descricao:
      "Conceito para revitalização de pousada histórica com espelhos d'água, mobiliário natural e iluminação cênica.",
    status: "Em concepção",
    dataInicio: null,
    dataFim: null,
  },
];

function ProjectList() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    let dados = JSON.parse(localStorage.getItem("projetos"));

    
    if (!dados || dados.length === 0) {
      localStorage.setItem("projetos", JSON.stringify(MOCK_PROJETOS));
      dados = MOCK_PROJETOS;
    }

    setProjetos(dados);

    document.body.classList.remove('login-background');
  }, []);

  const excluirProjeto = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      const novosProjetos = projetos.filter((p) => p.id !== id);
      setProjetos(novosProjetos);
      localStorage.setItem("projetos", JSON.stringify(novosProjetos));
    }
  };

  return (
    <div className="project-list-wrapper p-5">
      <h2 className="text-center text-primary mb-4">Projetos Cadastrados</h2>

      {projetos.length === 0 ? (
        <p className="text-center text-muted">Nenhum projeto cadastrado.</p>
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

                  <div className="d-flex justify-content-between mt-auto gap-2">
                    <Link
                      to={`/projetos/${proj.id}`}
                      className="btn btn-outline-primary btn-sm rounded-pill w-50"
                    >
                      Ver Detalhes
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm rounded-pill w-50"
                      onClick={() => excluirProjeto(proj.id)}
                    >
                      Excluir
                    </button>
                  </div>
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
