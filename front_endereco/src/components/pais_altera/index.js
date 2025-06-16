import React, { useEffect, useState } from "react";
import { FiArrowLeftCircle, FiEdit3 } from "react-icons/fi";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../service/api";
import "./styles.css";

export default function AlterarPais() {
  const { codigo } = useParams();
  const [nome, setNome] = useState("");
  const [sigla, setSigla] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPais() {
      try {
        const response = await api.get("Pais");
        const pais = response.data.find((p) => p.codigo == codigo);
        if (pais) {
          setNome(pais.nome);
          setSigla(pais.sigla);
        } else {
          alert("País não encontrado");
        }
      } catch (error) {
        alert("Erro ao carregar país: " + error.message);
      }
    }
    loadPais();
  }, [codigo]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (sigla.trim().length !== 2) {
      alert("A sigla deve ter exatamente 2 letras.");
      return;
    }

    try {
      await api.put("Pais", {
        codigo: parseInt(codigo),
        nome,
        sigla: sigla.toUpperCase(),
      });
      alert("País alterado com sucesso");
      navigate("/pais");
    } catch (error) {
      let mensagemErro = "Erro ao salvar país.";
      if (error.response?.data) {
        if (typeof error.response.data === "string") {
          mensagemErro = error.response.data;
        } else if (error.response.data.message) {
          mensagemErro = error.response.data.message;
        }
      }
      alert(mensagemErro);
    }
  }

  return (
    <div className="novo-estado-container">
      <div className="content">
        <section className="form">
          <FiEdit3 size={80} color="#007bff" />
          <h1>Alterar País</h1>
          <Link className="back-link" to="/pais">
            <FiArrowLeftCircle size={24} />
            Voltar
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nome do país"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            placeholder="Sigla"
            value={sigla}
            onChange={(e) => setSigla(e.target.value.toUpperCase())}
            maxLength={2}
            required
          />
          <button className="button" type="submit">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
