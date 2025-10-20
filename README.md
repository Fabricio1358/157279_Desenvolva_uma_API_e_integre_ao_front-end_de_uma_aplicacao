# projeto-react-api-node

Projeto em React com API simples em Node.

## Visão geral

Este repositório contém um frontend em React (Vite) em `src/` e uma API REST simples em Node/Express em `backend/`.

O backend expõe endpoints para gerenciamento de livros (CRUD). A aplicação usa SQLite como armazenamento (dependência `sqlite3`) e validações com `zod`.

## Endpoints da API

Base URL (por padrão): <https://one57279-desenvolva-uma-api-e-integre-ao.onrender.com/>

Prefixo das rotas: `/books`

Lista de endpoints:

- GET /books
  - Retorna todos os livros.
  - Exemplo de resposta: 200 OK
  [ { id, titulo, paginas, isbn, editora }, ... ]

- POST /books
  - Cria um novo livro.
  - Body (JSON) obrigatório — campos validados por `zod`:
    - titulo: string (obrigatório)
    - paginas: number (obrigatório)
    - isbn: string (obrigatório)
    - editora: string (obrigatório)
  - Exemplo de request body:
  {
   "titulo": "Exemplo de Livro",
   "paginas": 123,
   "isbn": "978-3-16-148410-0",
   "editora": "Minha Editora"
  }
  - Resposta: 201 Created com o objeto criado, ou 400 em caso de validação/erro.

- GET /books/:id
  - Busca um livro pelo ID (ID deve ser inteiro positivo).
  - Resposta: 200 OK com { book: { ... } } ou 404 se não encontrado.

- PUT /books/:id
  - Atualiza um livro pelo ID. Valida `id` e body (mesmos campos do POST).
  - Resposta: 200 OK com mensagem de sucesso e o livro atualizado, ou 400/404 em erro.

- DELETE /books/:id
  - Remove um livro pelo ID.
  - Resposta: 200 OK com mensagem de sucesso e o livro removido, ou 400/404 em erro.

Observações sobre validação:

- Os schemas estão em `backend/schema/book.schema.js`.
- O middleware de validação rejeita requests inválidos com 400 e a lista de erros do `zod`.

## Como executar

Pré-requisitos:

- Node.js (v16+ recomendado)
- npm ou yarn

Passos rápidos (Windows PowerShell):

1) Instalar dependências

```powershell
npm install


2) Rodar em modo produção (usa `node server.js`)

```powershell
npm run start


3) Rodar frontend em modo desenvolvimento (Vite)

```powershell
npm run dev
```

O servidor do backend inicia na porta configurada em `process.env.PORT` ou `3000` por padrão (arquivo `server.js`).

## Estrutura relevante

- `server.js` - ponto de entrada do servidor Express.
- `backend/routes/index.js` - monta o roteamento e usa o `book.routes.js` em `/books`.
- `backend/routes/book.routes.js` - define os endpoints CRUD.
- `backend/controller/` - controllers que tratam as requisições.
- `backend/service/`, `backend/repositories/` - lógica de negócio e acesso a dados.
- `backend/schema/` - schemas Zod para validação.

## Testes rápidos com curl / HTTPie

Exemplos usando curl:

```powershell
# Listar livros
curl http://localhost:3000/books

# Criar livro
curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"titulo":"Meu Livro","paginas":200,"isbn":"123","editora":"Editora X"}'

# Buscar por id
curl http://localhost:3000/books/1

# Atualizar
curl -X PUT http://localhost:3000/books/1 -H "Content-Type: application/json" -d '{"titulo":"Meu Livro 2","paginas":210,"isbn":"1234","editora":"Editora X"}'

# Deletar
curl -X DELETE http://localhost:3000/books/1
```

## Variáveis de ambiente

- PORT: porta onde o backend irá escutar (default 3000)

## Próximos passos / recomendações

- Incluir um script de seed para popular o banco SQLite para desenvolvimento.
- Documentar respostas de erro (formatos) e exemplos reais de payloads de sucesso.
- Adicionar testes automatizados (unit/integration) para controllers e services.

---

Se quiser, eu posso também adicionar exemplos no Postman/Insomnia ou criar um script de seed para popular o DB automaticamente.
