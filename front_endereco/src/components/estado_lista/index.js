import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuPencilLine, LuTrash2 } from "react-icons/lu"; // Ícones modernos
import api from "../../service/api";
import './styles.css';

export default function EstadoList() {
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    api.get("Estado")
      .then(response => setEstados(response.data))
      .catch(error => alert("Erro ao carregar estados: " + error));
  }, []);

  async function excluir(sigla) {
    if (window.confirm(`Deseja realmente excluir o estado ${sigla}?`)) {
      try {
        await api.delete(`Estado/${sigla}`);
        setEstados(estados.filter(estado => estado.sigla !== sigla));
        alert("Estado excluído com sucesso!");
      } catch (error) {
        alert("Erro ao excluir estado: " + error);
      }
    }
  }

  return (
    <div className="estado-container">
      <header>
        <span><strong>Lista de Estados</strong></span>

        <div style={{ display: "flex", gap: "10px" }}>
            <Link className="button" to="/">Voltar à Página Inicial</Link>
            <Link className="button" to="/estado/novo">Cadastrar Novo</Link>
        </div>
      </header>


      <table>
        <thead>
          <tr>
            <th>Sigla</th>
            <th>Nome</th>
            <th>País</th>
            <th className="thOpcoes">Ações</th>
          </tr>
        </thead>
        <tbody>
          {estados.map((estado) => (
            <tr key={estado.sigla}>
              <td>{estado.sigla}</td>
              <td>{estado.nome}</td>
              <td>{estado.pais?.nome}</td>
              <td className="tdOpcoes">
                <Link to={`/estado/alterar/${estado.sigla}`} title="Editar">
                  <button className="icon-button editar">
                    <LuPencilLine />
                  </button>
                </Link>
                <button className="icon-button excluir" title="Excluir" onClick={() => excluir(estado.sigla)}>
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
