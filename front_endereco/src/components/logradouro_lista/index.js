import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";
import api from "../../service/api";
import './styles.css';

export default function LogradouroList() {
  const [logradouros, setLogradouros] = useState([]);

  useEffect(() => {
    api.get("Logradouro")
      .then(response => setLogradouros(response.data))
      .catch(error => alert("Erro ao carregar logradouros: " + error));
  }, []);

  async function excluir(codigo) {
    if (window.confirm(`Deseja realmente excluir o logradouro`)) {
      try {
        await api.delete("Logradouro/" + codigo );
        setLogradouros(logradouros.filter(log => log.codigo !== codigo));
        alert("Logradouro excluído com sucesso!");
      } catch (error) {
        alert("Erro ao excluir logradouro: " + error);
      }
    }
  }

  return (
    <div className="estado-container">
      <header>
        <span><strong>Lista de Logradouros</strong></span>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link className="button" to="/">Voltar à Página Inicial</Link>
          <Link className="button" to="/logradouro/novo">Cadastrar Novo</Link>
        </div>
      </header>

      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>País</th>
            <th className="thOpcoes">Ações</th>
          </tr>
        </thead>
        <tbody>
          {logradouros.map((log) => (
            <tr key={log.codigo}>
              <td>{log.tipo}</td>
              <td>{log.nome}</td>
              <td>{log.cidade?.nome}</td>
              <td>{log.cidade?.estado?.nome}</td>
              <td>{log.cidade?.estado?.pais?.nome}</td>
              <td className="tdOpcoes">
                <Link to={`/logradouro/alterar/${log.codigo}`} title="Editar">
                  <button className="icon-button editar">
                    <LuPencilLine />
                  </button>
                </Link>
                <button className="icon-button excluir" title="Excluir" onClick={() => excluir(log.codigo)}>
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
