import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import Estado from "./components/estado_lista";
import NovoEstado from "./components/estado_novo";
import AlterarEstado from "./components/estado_altera";
import ExcluirEstado from "./components/estado_exclui";

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
            <Route path="/" exact element={
                <div>
                    <h1>Endereco - Controle</h1>
                    <Link className="button" to="estado">Estado</Link>
                </div>
            }/>
                <Route path="/estado" element={<Estado />} />
                <Route path="/novo/estado" element={<NovoEstado />} />
                <Route path="/estado/alterar/:sigla" element={<AlterarEstado />} />
                <Route path="/estado/excluir/:sigla" element={<ExcluirEstado />} />
            </Routes>
        </BrowserRouter>
    )
}