import React, { useEffect, useState } from "react";
import './styles.css';
//import logoEstado from '../../assets/Estado.png';
import api from "../../service/api";
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash } from "react-icons/fi";
import { Table } from "reactstrap";

export default function Estado(){

    const [lista,setLista] = useState([]);

    useEffect(() => {
        api.get('Estado').then(
            Response => {setLista(Response.data)}
        )
    })

    return(
        <div>
            <h1>Lista de Estados</h1>
            <Link className="button" to="/novo/estado">Novo Estado</Link>
            <Table className="table table-bordered">
                <thead>
                    <tr> 
                        <th>Sigla</th>
                        <th>Nome</th>
                        <th>Pais</th>
                        <th className="thOpcoes">Ações</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            lista.map(item => {
                                <tr>
                                    <td>{item.sigla}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.pais?.nome}</td>
                                    <td className="tdOpcoes">
                                    <Link to={`alterar/${item.sigla}`}>
                                        <button type="button">
                                            <FiEdit size={25} color="#17202a" />
                                        </button>
                                    </Link>
                                    {" "}
                                    <Link to={`excluir/${item.sigla}`}>
                                        <button type="button">
                                            <FiTrash size={25} color="#17202a" />
                                        </button>
                                    </Link>
                                </td>
                                </tr>
                            })
                        }
                </tbody>     
            </Table>
        </div>
    )
    
}