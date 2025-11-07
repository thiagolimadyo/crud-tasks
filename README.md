# crud-tasks

> Desafio 1 – Rocketseat – CRUD de Tarefas – Fundamentos do Node.js

## Visão Geral

Este projeto implementa um sistema simples de **CRUD (Create, Read, Update, Delete)** para tarefas, usando Node.js.  
Permite criar, listar, atualizar e deletar tarefas armazenadas em um arquivo CSV.  
É parte do desafio da Rocketseat para a trilha de Fundamentos do Node.js.

## Tecnologias

- Node.js
- JavaScript (ES6+)
- Gerenciamento de dependências com npm
- Leitura de arquivo CSV para persistência com streams
- Estrutura de código modularizada com controllers

## Como Rodar Localmente

1. Clone este repositório

```bash
git clone https://github.com/thiagolimadyo/crud-tasks.git
```

2. Acesse a pasta do projeto

```bash
cd crud-tasks
```

3. Instale as dependências

```bash
npm install
```

4. Execute o projeto

```bash
npm start
```

5. Execute a carga de dados inicial

```bash
npm run importCSV
```

6. Acesse com Postman ou Insomnia: http://localhost:3333/tasks para incluir ou buscar tarefas

7. Acesso http://localhost:3333/tasks/:id para alterar ou excluir ou buscar tarefas

8. Acesso http://localhost:3333/tasks/:id/complete para encerrar ou voltar uma tarefa para pendente
