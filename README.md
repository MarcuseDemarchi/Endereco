# Projeto de Programação Orientada a Objetos (POO)

Este repositório contém um projeto desenvolvido para a disciplina de 
\**Programação Orientada a Objetos**, com aplicação prática em **C#** (backend) e **React** (frontend). 
O objetivo do projeto é implementar um sistema de controle de endereços com foco em estados, permitindo listagem e criação de registros.

## Tecnologias Utilizadas

### Backend (C#)
- ASP.NET Core
- Banco de Dados = PostgreSQL

### Frontend (React)
- React + TypeScript
- React Router
- CSS

## Funcionalidades

### Frontend:
- Página inicial com navegação
- Listagem de estados cadastrados
- Cadastro de novos estados via formulário

### Backend:
- Endpoints para:
  - `GET /estados` – Listar estados
  - `POST /estados` – Criar novo estado
  - `PUT` e `DELETE` para editar e remover estados
  - Validações básicas