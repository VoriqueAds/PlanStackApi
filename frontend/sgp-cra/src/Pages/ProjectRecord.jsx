import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Routes, Route, Link } from "react-router-dom";
import './ProjectRecord.css';

function ProjectRecord() {
  const [projetos, setProjetos] = useState([]);

  // Carrega do localStorage ao iniciar
  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("projetos")) || [];
    setProjetos(dadosSalvos);
  }, []);

  // Adiciona novo projeto e salva no localStorage
  const addProjeto = (form) => {
    const novoProjeto = { ...form, id: Date.now() };
    const novosProjetos = [...projetos, novoProjeto];
    setProjetos(novosProjetos);
    localStorage.setItem("projetos", JSON.stringify(novosProjetos));
    alert("Projeto cadastrado com sucesso!");
  };

  return (
    <Routes>
      <Route path="/" element={<ProjectForm projetos={projetos} onAdd={addProjeto} />} />
      <Route path=":id" element={<ProjectDetails />} />
    </Routes>
  );
}

function ProjectForm({ projetos, onAdd }) {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    dataInicio: '',
    dataFim: '',
    status: 'Planejado'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      nome: '',
      descricao: '',
      dataInicio: '',
      dataFim: '',
      status: 'Planejado'
    });
  };

  return (
    <div className="page-wrapper d-flex flex-column align-items-center justify-content-start p-4">
      <div className="card record-card shadow-lg rounded-4 mb-5 w-100" style={{ maxWidth: '800px' }}>
        <div className="card-body p-5">
          <h2 className="text-center text-primary fw-bold mb-4">Cadastrar Projeto</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control rounded-pill"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-control rounded-pill"
                name="descricao"
                rows="2"
                value={form.descricao}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label">Data Início</label>
                <input
                  type="date"
                  className="form-control rounded-pill"
                  name="dataInicio"
                  value={form.dataInicio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-4">
                <label className="form-label">Data Término</label>
                <input
                  type="date"
                  className="form-control rounded-pill"
                  name="dataFim"
                  value={form.dataFim}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Status</label>
              <select
                className="form-select rounded-pill"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Planejado">Planejado</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg rounded-pill">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-100" style={{ maxWidth: '900px' }}>
        <h3 className="text-center text-secondary fw-bold mb-3">Projetos Cadastrados</h3>
        {projetos.length === 0 ? (
          <p className="text-center text-muted">Nenhum projeto cadastrado ainda.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Data Início</th>
                  <th>Data Fim</th>
                  <th>Status</th>
                  <th>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {projetos.map(proj => (
                  <tr key={proj.id}>
                    <td>{proj.nome}</td>
                    <td>{proj.descricao}</td>
                    <td>{proj.dataInicio}</td>
                    <td>{proj.dataFim}</td>
                    <td>{proj.status}</td>
                    <td>
                      <Link to={`/projetos/${proj.id}`} className="btn btn-outline-primary btn-sm rounded-pill">
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projeto, setProjeto] = useState(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("projetos")) || [];
    const encontrado = dados.find(p => p.id === Number(id));
    setProjeto(encontrado);

    document.body.classList.remove('login-background');
  }, [id]);

  if (!projeto) {
    return (
      <div className="project-details-page text-center p-5">
        <h2>Projeto não encontrado</h2>
        <button onClick={() => navigate('/projetos')} className="btn btn-secondary mt-3">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="project-details-page p-5">
      <h2 className="text-primary">Projeto: {projeto.nome}</h2>
      <p><strong>Descrição:</strong> {projeto.descricao}</p>
      <p><strong>Data de Início:</strong> {projeto.dataInicio}</p>
      <p><strong>Data de Fim:</strong> {projeto.dataFim}</p>
      <p><strong>Status:</strong> {projeto.status}</p>
      <button onClick={() => navigate('/projetos')} className="btn btn-outline-primary mt-3">
        Voltar
      </button>
    </div>
  );
}

export default ProjectRecord;
