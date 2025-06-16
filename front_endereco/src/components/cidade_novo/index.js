import React, { useState, useEffect } from "react";
import './styles.css';
import { LuArrowLeft, LuFilePlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import api from "../../service/api.js";

export default function NovaCidade() {
    const [nome, setNome] = useState('');
    const [estadoCodigo, setEstadoCodigo] = useState('');
    const [listaEstados, setListaEstados] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('Estado')
            .then(response => setListaEstados(response.data))
            .catch(error => alert("Erro ao carregar estados"));
    }, []);

    async function postCidade(event) {
        event.preventDefault();
        const data = {
            nome,
            estadoCodigo: parseInt(estadoCodigo)
        };
        try {
            await api.post('Cidade', data);
            alert("Cidade cadastrada com sucesso");
            navigate("/cidade");
        } catch (error) {
            alert("Erro ao salvar cidade: " + error.response?.data || error.message);
        }
    }

    return (
        <div className="novo-estado-container">
            <div className="content">
                <section className="form">
                    <LuFilePlus size={60} color="#007bff" />
                    <h1>Nova Cidade</h1>
                    <Link className="back-link" to="/cidade">
                        <LuArrowLeft size={36} color="#007bff" />
                        <span style={{ marginLeft: '8px' }}>Voltar</span>
                    </Link>
                </section>
                <form onSubmit={postCidade}>
                    <input
                        placeholder="Nome da Cidade"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                    />
                    <select
                        value={estadoCodigo}
                        onChange={e => setEstadoCodigo(e.target.value)}
                        required
                    >
                        <option value="">Selecione o Estado</option>
                        {listaEstados.map(estado => (
                            <option key={estado.codigo} value={estado.codigo}>
                                {estado.nome} - {estado.pais?.nome}
                            </option>
                        ))}
                    </select>
                    <button className="button" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
}
