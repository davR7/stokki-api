# 📌 Stokki API

API REST para cadastro e consulta de produtos e controle de estoque, desenvolvida com Node.js, TypeScript, Express.js e MongoDB,
com validação de dados, testes automatizados e CI com GitHub Actions.

## 🛠️ Tecnologias

Node.js 24 · TypeScript · Express.JS · MongoDB · Mongoose · Vitest · Supertest · Biome · GitHub Actions

## ✨ Funcionalidades

* Cadastro de categorias via seed
* Cadastro de produtos com estoque inicial
* Listagem de produtos com paginação
* Busca por nome e filtro por categoria
* Atualização de estoque
* Listagem de produtos com estoque baixo
* Testes automatizados
* CI com GitHub Actions

## 🚀 Executando o projeto

Clone o projeto, instale as dependências e configure os arquivos `.env`:

### Pré-requisitos

- Node.js 24+
- MongoDB
- npm

### Variáveis de Ambiente (`stokki-api/.env`)

A aplicação deve possuir seu próprio arquivo `.env`, crie com base nas informações abaixo:

- `NODE_ENV` (padrão: `development ou production`)
- `MONGODB_URI` (exemplo: `mongodb://localhost:27017/stokki`)
- `PORT` (exemplo: `4008`)

### Instalação

```bash
cd ./stokki-api
npm install
```

### Scripts

- `npm run dev` - Inicia o servidor da API em modo de desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm run start` - Inicia o servidor compilado
- `npm run seed:categories` - Cria as categorias para produto

---

Desenvolvido por **Davidson Ratis** · [GitHub](https://github.com/davR7) · [LinkedIn](https://www.linkedin.com/in/davidson-ratis/)
