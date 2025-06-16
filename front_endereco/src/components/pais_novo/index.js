import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LuArrowLeft, LuFilePlus } from "react-icons/lu";
import api from "../../service/api";
import './styles.css';

export default function NovoPais() {
  const [nome, setNome] = useState("");
  const [sigla, setSigla] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("Pais", { nome, sigla });
      alert("País cadastrado com sucesso");
      navigate("/pais");
    } catch (err) {
      alert("Erro ao cadastrar país: " + (err.response?.data || err.message));
    }
  }

  return (
    <div className="novo-pais-container">
      <div className="content">
        <section className="form">
          <LuFilePlus size={60} color="#007bff" />
          <h1>Novo País</h1>
          <Link className="back-link" to="/pais">
            <LuArrowLeft size={36} color="#007bff" />
            <span style={{ marginLeft: '8px' }}>Voltar</span>
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
          <input placeholder="Sigla" value={sigla} onChange={e => setSigla(e.target.value)} maxLength={2} />
          <button className="button" type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
