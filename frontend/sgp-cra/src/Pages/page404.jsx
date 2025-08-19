import React from 'react';
import Robot404 from '../../assets/imgs/robot404.jpeg';
import { Link } from 'react-router-dom';

function Page404() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center min-vh-100 bg-light px-3">
      <img src={Robot404} alt="Erro 404" className="img-fluid mb-4" style={{ maxWidth: '350px' }}/>
      <h1 className="display-4 fw-bold text-danger">404 - Página não encontrada</h1>
      <p className="lead text-secondary mb-3">
        A página que você tentou acessar não existe ou foi removida.
      </p>
      <Link to="/" className="btn btn-outline-primary rounded-pill px-4">
        Voltar para o Início
      </Link>
    </div>
  );
}

export default Page404;
