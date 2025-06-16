import React, { useCallback, useEffect, useState } from "react";
import { FiArrowLeftCircle, FiEdit3 } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../service/api";

export default function AlterarEstado() {
  const { sigla: siglaOriginal } = useParams();
  const [sigla, setSigla] = useState("");
  const [nome, setNome] = useState("");
  const [paisCodigo, setPaisCodigo] = useState("");
  const [listaPaises, setListaPaises] = useState([]);
  const navigate = useNavigate();

  const loadEstado = useCallback(async () => {
    try {
      const response = await api.get("Estado/" + siglaOriginal);
      setSigla(response.data.sigla);
      setNome(response.data.nome);
      setPaisCodigo(response.data.paisCodigo.toString());
    } catch (error) {
      alert("Erro ao carregar estado.");
    }
  }, [siglaOriginal]);

  const loadPaises = useCallback(async () => {
    try {
      const response = await api.get("Pais");
      setListaPaises(response.data);
    } catch (error) {
      alert("Erro ao carregar países.");
    }
  }, []);

  useEffect(() => {
    loadEstado();
    loadPaises();
  }, [loadEstado, loadPaises]);

  async function putEstado(e) {
    e.preventDefault();

    if (!sigla || sigla.trim().length !== 2) {
      alert("A sigla deve conter exatamente 2 caracteres.");
      return;
    }

    const data = {
      sigla, 
      siglaOriginal, 
      nome,
      paisCodigo: parseInt(paisCodigo),
    };

    try {
      await api.put("Estado", data);
      alert("Estado alterado com sucesso.");
      navigate("/estado");
    } catch (error) {
      let mensagemErro = "Erro ao salvar estado.";

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
          <h1>Alterar Estado</h1>
          <Link className="back-link" to="/estado">
            <FiArrowLeftCircle size={24} />
            Voltar
          </Link>
        </section>

        <form onSubmit={putEstado}>
          <input
            placeholder="Sigla"
            value={sigla}
            onChange={(e) => setSigla(e.target.value.toUpperCase())}
            maxLength={2}
            required
          />
          <input
            placeholder="Nome do estado"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <select
            value={paisCodigo}
            onChange={(e) => setPaisCodigo(e.target.value)}
            required
          >
            <option value="">Selecione o país</option>
            {listaPaises.map((pais) => (
              <option key={pais.codigo} value={pais.codigo}>
                {pais.nome}
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
