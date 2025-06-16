import React, { useCallback, useEffect, useState } from "react";
import { FiArrowLeftCircle, FiEdit3 } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../service/api";

export default function AlterarLogradouro() {
  const { codigo } = useParams();
  const [tipo, setTipo] = useState("");
  const [nome, setNome] = useState("");
  const [cidadeCodigo, setCidadeCodigo] = useState("");
  const [listaCidades, setListaCidades] = useState([]);
  const navigate = useNavigate();

  const loadLogradouro = useCallback(async () => {
    try {
      const response = await api.get("Logradouro/" + codigo);
      setTipo(response.data.tipo);
      setNome(response.data.nome);
      setCidadeCodigo(response.data.cidadeCodigo.toString());
    } catch (error) {
      alert("Erro ao carregar logradouro.");
    }
  }, [codigo]);

  const loadCidades = useCallback(async () => {
    try {
      const response = await api.get("Cidade");
      setListaCidades(response.data);
    } catch (error) {
      alert("Erro ao carregar cidades.");
    }
  }, []);

  useEffect(() => {
    loadLogradouro();
    loadCidades();
  }, [loadLogradouro, loadCidades]);

  async function putLogradouro(e) {
    e.preventDefault();

    const data = {
      codigo: parseInt(codigo),
      tipo,
      nome,
      cidadeCodigo: parseInt(cidadeCodigo),
    };

    try {
      await api.put("Logradouro", data);
      alert("Logradouro alterado com sucesso.");
      navigate("/logradouro");
    } catch (error) {
      let mensagemErro = "Erro ao salvar logradouro.";

      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          mensagemErro = error.response.data;
        } else if (error.response.data.message) {
          mensagemErro = error.response.data.message;
        }
      } else if (error.message) {
        mensagemErro = error.message;
      }

      alert(mensagemErro);
    }
  }

  return (
    <div className="novo-estado-container">
      <div className="content">
        <section className="form">
          <FiEdit3 size={80} color="#007bff" />
          <h1>Alterar Logradouro</h1>
          <Link className="back-link" to="/logradouro">
            <FiArrowLeftCircle size={24} />
            Voltar
          </Link>
        </section>

        <form onSubmit={putLogradouro}>
          <input
            placeholder="Tipo (Rua, Avenida...)"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <select
            value={cidadeCodigo}
            onChange={(e) => setCidadeCodigo(e.target.value)}
            required
          >
            <option value="">Selecione a cidade</option>
            {listaCidades.map((cidade) => (
              <option key={cidade.codigo} value={cidade.codigo}>
                {cidade.nome} - {cidade.estado?.sigla}
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
