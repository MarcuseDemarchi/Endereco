import React, { useEffect, useState } from "react";
import './styles.css';
import api from "../../service/api";
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash } from "react-icons/fi";
import { Table } from "reactstrap";

export default function Estado() {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        api.get('estado').then(response => {
            setLista(response.data);
        });
    }, []);

    async function deleteEstado(sigla) {
    if (window.confirm(`Tem certeza que deseja excluir o estado ${sigla}?`)) {
        try {
            await api.delete(`estado/${sigla}`);
            alert("Estado excluído com sucesso!");

            // Atualiza a lista local sem o item removido
            setLista(lista.filter(estado => estado.sigla !== sigla));

        } catch (error) {
            alert("Erro ao excluir estado: " + error);
        }
    }
}


    return (
        <div>
            <h1>Lista de Estados</h1>
            <Link className="button" to="/novo/estado">Novo Estado</Link>
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Sigla</th>
                        <th>Nome</th>
                        <th>País</th>
                        <th className="thOpcoes">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lista.map(item => {
                            return (
                                <tr key={item.sigla}>
                                    <td>{item.sigla}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.pais?.nome}</td>
                                    <td className="tdOpcoes">
                                        <Link to={`/estado/alterar/${item.sigla}`}>
                                            <button type="button">
                                                <FiEdit size={25} color="#17202a" />
                                            </button>
                                        </Link>
                                        {" "}
                                        <button type="button" onClick={() => deleteEstado(item.sigla)}>
                                            <FiTrash size={25} color="#17202a" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}
