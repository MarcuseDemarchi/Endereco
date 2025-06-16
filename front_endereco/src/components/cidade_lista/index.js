import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../service/api";
import './styles.css';

export default function CidadeList() {
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
  api.get("Cidade")
    .then((response) => setCidades(response.data))
    .catch((error) => {
      console.error(error);
      alert("Erro ao carregar cidades.");
    });
}, []);


  async function excluir(codigo) {
    if (window.confirm(`Deseja realmente excluir a cidade`)) {
      try {
        await api.delete("Cidade/" + codigo );
        setCidades(cidades.filter(cidade => cidade.codigo !== codigo));
        alert("Cidade excluída com sucesso!");
      } catch (error) {
        alert("Erro ao excluir cidade: " + error);
      }
    }
  }

  return (
    <div className="estado-container">
      <header>
        <span><strong>Lista de Cidades</strong></span>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link className="button" to="/">
            <FiArrowLeft style={{ marginRight: "6px" }} />
            Voltar à Página Inicial
          </Link>
          <Link className="button" to="/cidade/novo">Cadastrar Nova</Link>
        </div>
      </header>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Estado</th>
            <th>País</th>
            <th className="thOpcoes">Ações</th>
          </tr>
        </thead>
        <tbody>
          {cidades.map(cidade => (
            <tr key={cidade.codigo}>
              <td>{cidade.nome}</td>
              <td>{cidade.estado?.nome}</td>
              <td>{cidade.estado?.pais?.nome}</td>
              <td className="tdOpcoes">
               <Link to={`/cidade/alterar/${cidade.codigo}`}>
                  <button className="icon-button editar">
                    <LuPencilLine />
                  </button>
                </Link>
                <button className="icon-button excluir" title="Excluir" onClick={() => excluir(cidade.codigo)}>
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
