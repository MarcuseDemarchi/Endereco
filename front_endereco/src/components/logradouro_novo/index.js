import React, { useState, useEffect } from "react";
import './styles.css';
import { LuArrowLeft, LuFilePlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import api from "../../service/api.js";

export default function NovoLogradouro() {
    const [tipo, setTipo] = useState('');
    const [nome, setNome] = useState('');
    const [cidadeCodigo, setCidadeCodigo] = useState('');
    const [listaCidades, setListaCidades] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('Cidade')
            .then(response => setListaCidades(response.data))
            .catch(error => alert("Erro ao carregar cidades: " + error));
    }, []);

    async function postLogradouro(event) {
        event.preventDefault();
        const data = {
            tipo,
            nome,
            cidadeCodigo: parseInt(cidadeCodigo)
        };
        try {
            await api.post('Logradouro', data);
            alert("Logradouro cadastrado com sucesso");
            navigate("/logradouro");
        } catch (error) {
            alert("Erro ao salvar logradouro: " + error.response?.data || error.message);
        }
    }

    return (
        <div className="novo-estado-container">
            <div className="content">
                <section className="form">
                    <LuFilePlus size={60} color="#007bff" />
                    <h1>Novo Logradouro</h1>
                    <Link className="back-link" to="/logradouro">
                        <LuArrowLeft size={36} color="#007bff" />
                        <span style={{ marginLeft: '8px' }}>Voltar</span>
                    </Link>
                </section>
                <form onSubmit={postLogradouro}>
                    <input
                        placeholder="Tipo (Rua, Avenida...)"
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                    />
                    <select
                        value={cidadeCodigo}
                        onChange={e => setCidadeCodigo(e.target.value)}
                        required
                    >
                        <option value="">Selecione a cidade</option>
                        {listaCidades.map(cidade => (
                            <option key={cidade.codigo} value={cidade.codigo}>
                                {cidade.nome} - {cidade.estado?.sigla}
                            </option>
                        ))}
                    </select>
                    <button className="button" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
}
