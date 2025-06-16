import React, { useState, useEffect } from "react";
import './styles.css';
import { LuArrowLeft, LuFilePlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import api from "../../service/api.js";

export default function NovoEstado() {
    const [sigla, setSigla] = useState('');
    const [nome, setNome] = useState('');
    const [paisCodigo, setPaisCodigo] = useState('');
    const [listaPaises, setListaPaises] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('Pais')
            .then(response => setListaPaises(response.data))
            .catch(error => alert("Erro ao carregar países"));
    }, []);

    async function postEstado(event) {
        event.preventDefault();
        const data = {
            sigla,
            nome,
            paisCodigo: parseInt(paisCodigo)
        };
        try {
            await api.post('Estado', data);
            alert("Estado cadastrado com sucesso");
            navigate("/estado");
        } catch (error) {
            alert("Erro ao salvar estado: " + error.response?.data || error.message);
        }
    }

    return (
        <div className="novo-estado-container">
            <div className="content">
                <section className="form">
                    <LuFilePlus size={60} color="#007bff" />
                    <h1>Novo Estado</h1>
                    <Link className="back-link" to="/estado">
                        <LuArrowLeft size={36} color="#007bff" />
                        <span style={{ marginLeft: '8px' }}>Voltar</span>
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
