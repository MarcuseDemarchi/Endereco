import React, { useState, useEffect } from "react";
import './styles.css';
import { FiCornerDownLeft, FiFilePlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../service/api.js";

export default function NovoEstado() {
    const [sigla, setSigla] = useState('');
    const [nome, setNome] = useState('');
    const [paisCodigo, setPaisCodigo] = useState('');
    const [listaPaises, setListaPaises] = useState([]);

    useEffect(() => {
        api.get('Pais')
            .then(response => setListaPaises(response.data))
            .catch(error => alert("Erro ao carregar países"));
    }, []);

    async function postEstado(event) {
        event.preventDefault(); // ← importante!
        const data = {
            sigla,
            nome,
            paisCodigo: parseInt(paisCodigo)
        };
        try {
            await api.post('Estado', data);
            alert("Estado cadastrado com sucesso");
        } catch (error) {
            alert("Erro ao salvar estado: " + error.response?.data || error.message);
        }
    }

    return (
        <div className="novo-estado-container">
            <div className="content">
                <section className="form">
                    <FiFilePlus size={105} color="#17202a" />
                    <h1>Novo Estado</h1>
                    <Link className="back-link" to="/estado">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <form onSubmit={postEstado}>
                    <input placeholder="Sigla" maxLength={2} onChange={e => setSigla(e.target.value)} />
                    <input placeholder="Nome" onChange={e => setNome(e.target.value)} />
                    <select value={paisCodigo} onChange={e => setPaisCodigo(e.target.value)}>
                        <option value="">Selecione o país</option>
                        {listaPaises.map(pais => (
                            <option key={pais.codigo} value={pais.codigo}>
                                {pais.nome}
                            </option>
                        ))}
                    </select>
                    <button className="button" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
}