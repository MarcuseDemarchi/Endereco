import React, { useCallback, useEffect, useState } from "react";
import { FiEdit3, FiArrowLeftCircle } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../service/api";
import './styles.css';

export default function AlterarCidade() {
  const { codigo } = useParams();
  const [nome, setNome] = useState("");
  const [estadoCodigo, setEstadoCodigo] = useState("");
  const [estados, setEstados] = useState([]);
  const navigate = useNavigate();

  const loadCidade = useCallback(async () => {
    try {
      const response = await api.get("Cidade/" + codigo);
      setNome(response.data.nome);
      setEstadoCodigo(response.data.estadoCodigo.toString());
    } catch (error) {
      alert("Erro ao carregar dados da cidade.");
    }
  }, [codigo]);

  const loadEstados = useCallback(async () => {
    try {
      const response = await api.get("Estado");
      setEstados(response.data);
    } catch (error) {
      alert("Erro ao carregar estados.");
    }
  }, []);

 useEffect(() => {
  loadCidade();
  loadEstados();
}, [loadCidade, loadEstados]);

  async function putCidade(e) {
    e.preventDefault();
    try {
      await api.put("Cidade/" + codigo, {
        nome,
        estadoCodigo: parseInt(estadoCodigo)
      });
      alert("Cidade alterada com sucesso!");
      navigate("/cidade");
    } catch (error) {
      alert("Erro ao alterar cidade: " + error.response?.data || error.message);
    }
  }

  return (
    <div className="novo-estado-container">
      <div className="content">
        <section className="form">
          <FiEdit3 size={80} color="#007bff" />
          <h1>Alterar Cidade</h1>
          <Link className="back-link" to="/cidade">
            <FiArrowLeftCircle size={24} />
            <span style={{ marginLeft: '8px' }}>Voltar</span>
          </Link>
        </section>

        <form onSubmit={putCidade}>
          <input
            placeholder="Nome da Cidade"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <select
            value={estadoCodigo}
            onChange={(e) => setEstadoCodigo(e.target.value)}
            required
          >
            <option value="">Selecione o Estado</option>
            {estados.map((estado) => (
              <option key={estado.codigo} value={estado.codigo}>
                {estado.nome} - {estado.pais?.nome}
              </option>
            ))}
          </select>
          <button className="button" type="submit">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
