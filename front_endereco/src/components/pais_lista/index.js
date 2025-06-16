import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";
import api from "../../service/api";
import './styles.css';
import { FiArrowLeft } from "react-icons/fi";


export default function PaisList() {
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    api.get("Pais")
      .then(response => setPaises(response.data))
      .catch(error => alert("Erro ao carregar países: " + error));
  }, []);

  async function excluir(codigo) {
    if (window.confirm(`Deseja realmente excluir o país?`)) {
      try {
        await api.delete(`Pais/${codigo}`);
        setPaises(paises.filter(p => p.codigo !== codigo));
        alert("País excluído com sucesso!");
      } catch (error) {
        alert("Erro ao excluir país: " + error);
      }
    }
  }

  return (
    <div className="pais-container">
      <header>
        <span><strong>Lista de Países</strong></span>
        <div style={{ display: "flex", gap: "10px" }}>
            <Link className="button" to="/">
            <FiArrowLeft style={{ marginRight: "6px" }} />
            Voltar à Página Inicial
            </Link>
            <Link className="button" to="/pais/novo">Cadastrar Novo</Link>
        </div>
     </header>

      <table>
        <thead>
          <tr>
            <th>Sigla</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {paises.map(pais => (
            <tr key={pais.codigo}>
              <td>{pais.sigla}</td>
              <td>{pais.nome}</td>
              <td>
                <Link to={`/pais/alterar/${pais.codigo}`}>
                  <button className="icon-button editar"><LuPencilLine /></button>
                </Link>
                <button className="icon-button excluir" onClick={() => excluir(pais.codigo)}>
                  <LuTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
