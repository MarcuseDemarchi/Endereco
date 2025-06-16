import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import Estado from "./components/estado_lista";
import NovoEstado from "./components/estado_novo";
import AlterarEstado from "./components/estado_altera";
import Pais from "./components/pais_lista";
import NovoPais from "./components/pais_novo";
import AlterarPais from "./components/pais_altera";
import Cidade from "./components/cidade_lista";
import NovaCidade from "./components/cidade_novo";
import AlterarCidade from "./components/cidade_altera";
import Logradouro from "./components/logradouro_lista";
import NovaLogradouro from "./components/logradouro_novo";
import AlterarLogradouro from "./components/logradouro_altera";

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
            <Route path="/" exact element={
              <div className="home-container">
                <h1>Controle de Endereços</h1>
                <Link className="button home-button" to="pais">Pais</Link>
                <br></br>
                <Link className="button home-button" to="estado">Estado</Link>
                <br></br>
                <Link className="button home-button" to="cidade">Cidade</Link>
                <br></br>
                <Link className="button home-button" to="logradouro">Logradouro</Link>
              </div>
            }/>
                <Route path="/estado" element={<Estado />} />
                <Route path="/estado/novo" element={<NovoEstado />} />
                <Route path="/estado/alterar/:sigla" element={<AlterarEstado />} />

                <Route path="/pais" element={<Pais />} />
                <Route path="/pais/novo" element={<NovoPais />} />
                <Route path="/pais/alterar/:codigo" element={<AlterarPais />} />

                <Route path="/cidade" element={<Cidade />} />
                <Route path="/cidade/novo" element={<NovaCidade />} />
                <Route path="/cidade/alterar/:codigo" element={<AlterarCidade />} />

                <Route path="/logradouro" element={<Logradouro />} />
                <Route path="/logradouro/novo" element={<NovaLogradouro />} />
                <Route path="/logradouro/alterar/:codigo" element={<AlterarLogradouro />} />
            </Routes>
        </BrowserRouter>
    )
}