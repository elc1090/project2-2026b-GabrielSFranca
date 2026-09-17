1. Pesquisar filmes e séries
Descrição curta da tarefa

Implementar uma busca que permita ao usuário encontrar filmes e séries pelo título utilizando a API do TMDB.

Como implementar

No frontend, criar uma tela de busca com:

[ 🔍 Digite o nome de um filme ou série... ] [Buscar]

O React mantém o texto pesquisado em um estado:

query = "Batman"

Ao realizar a busca, o frontend não deve chamar o TMDB diretamente. A requisição deve passar pelo backend:

GET /api/search?query=Batman

O Fastify recebe query e faz a chamada ao TMDB.

Exemplo conceitual:

Frontend
   ↓
GET /api/search?query=Batman
   ↓
Fastify
   ↓
TMDB /search/multi
   ↓
Fastify transforma os dados
   ↓
Frontend recebe JSON

Isso mantém o token do TMDB no backend e permite que o backend controle erros, validação e formato dos dados.

O TMDB permite pesquisas em português e utiliza códigos como pt-BR para localização.

Backend

Criar uma rota:

GET /api/search

Parâmetro:

query

Exemplo:

GET /api/search?query=interestelar

A rota pode fazer:

const response = await fetch(
  `https://api.themoviedb.org/3/search/multi?query=${query}&language=pt-BR`,
  {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      accept: "application/json"
    }
  }
);

Depois disso, retornar somente os dados necessários para o frontend.

Por exemplo:

{
  "results": [
    {
      "tmdbId": 157336,
      "mediaType": "movie",
      "title": "Interestelar",
      "posterPath": "/..."
    }
  ]
}
Frontend

Criar:

app/
├── page.tsx
├── components/
│   ├── SearchBar.tsx
│   └── SearchResultCard.tsx

A página recebe o termo e apresenta os resultados em cards.

Validação

O Fastify permite associar schemas às rotas para validar parâmetros e corpo das requisições.

Por exemplo:

query obrigatório
query deve ser string
query não pode estar vazio