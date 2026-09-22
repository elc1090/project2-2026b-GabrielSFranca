# Projeto: Aplicação com persistência de dados em backend

![Substitua a imagem ao lado por um GIF/WEBP animado mostrando seu projeto](./moho_follow_through2.gif "GIF animado do projeto. Imagem temporária de Moho Animation https://moho.lostmarble.com/products/moho-pro-special-halls-head-college")

## Acesso
Substitua este texto pela URL para acesso ao seu app publicado. Adicione a URL também na seção "About" do seu repositório no GitHub.

## Desenvolvedor(a)
- Aluno: Gabriel França
- Curso: Sistemas de Informação

## Proposta: App Web de busca e gerenciamento pessoal de filmes e séries

## Descrição

* Dados obtidos de uma API pública externa;
* Backend próprio;
* Persistência: base de dados NoSQL.

## Funcionalidades

1. Pesquisar filmes e séries;
2. Visualizar detalhes do título: capa, título, sinopse, gênero, ano, elenco, episódios, nota externa etc.;
3. Criar playlists personalizadas;
4. Dar uma nota ao título;
5. Escrever uma resenha;
6. Editar ou remover a própria avaliação.

### Fora de escopo
* Autenticação de múltiplos usuários.

## Parceria/cliente/usuário
Miguel Miron

## Feedback/comentário da parceria/cliente/usuário
Substitua este texto por um feedback produzido pelo(a) colega parceiro(a). Na modalidade A (parceria dev), o foco principal do feedback/comentário estará nas diferenças percebidas no código. Na modalidade B (parceria cliente/usuário), o foco principal do feedback/comentário estará nas funcionalidades/interface.

## Desenvolvimento

### Processo

Substitua este texto por uma descrição do processo de desenvolvimento **em primeira pessoa, sem ajuda de IA**, explicando e justificando suas escolhas, destacando o que já sabia ou não, como lidou com dúvidas ou dificuldades específicas, que adaptações foram necessárias, etc. Evite comentários genéricos como "pedi ajuda para IA e resolvi", dando preferência para expor detalhes específicos de um problema e sua solução.

### Trechos de código

Indique pelo menos 3 trechos de código que você queira destacar para a turma (por exemplo, para explicar algo que aprendeu, para alertar sobre alguma dificuldade de compreensão, para mostrar uma curiosidade, etc).


## Tecnologias
### Linguagens e afins

### Backend
* **Linguagem:** TypeScript
* **Framework:** Node.js + Fastify
* **Banco de dados:** NoSQL
* **Hospedagem:** Render

### Frontend
* **HTML5 + CSS3**
* **Frameworks:** Next.js + React.js
* **Hospedagem:** Vercel

### Ambiente de desenvolvimento

- Windows e Visual Studio Code
- Agente Codex (OpenAI), como extensão do Visual Studio Code

## Referências e créditos

Substitua este trecho por uma lista bem detalhada de todo material que você consultou para ajudar no projeto, por exemplo:  URLs de vídeos ou outro material consultado, créditos para colegas que colaboraram, geradores de código, etc.
- Gabriel Maroneze
- Google Gemini e Gemini Notebook




---
Projeto entregue para a disciplina de [Desenvolvimento de Software para a Web](http://github.com/andreainfufsm/elc1090-2026b) em 2026b





## 1. Project Overview

A non-commercial academic web application developed for a university Web Development course.

The application allows a single user to search for movies and TV series using the TMDB API, view title details, save titles to a personal library, organize them into playlists, and create personal ratings and written reviews.

The project has **one user only** and therefore **does not implement multi-user authentication**.

### Main responsibilities

- **TMDB API**: external source of movie and TV series catalog data.
- **Backend API**: application business logic, TMDB integration, validation, and persistence access.
- **MongoDB**: persistent storage of user-specific application data.
- **Frontend**: user interface and interaction.

### High-level architecture

```text
┌───────────────────────────────┐
│       Next.js + React         │
│          Frontend             │
└───────────────┬───────────────┘
                │ HTTP / JSON
                ▼
┌───────────────────────────────┐
│    Node.js + Fastify          │
│      TypeScript Backend       │
└──────────┬────────────┬───────┘
           │            │
           │            │
           ▼            ▼
┌────────────────┐  ┌────────────────┐
│    MongoDB     │  │    TMDB API    │
│  Application   │  │ External data  │
│     data       │  │     source     │
└────────────────┘  └────────────────┘
```

---

## 2. Project Goals

The project must demonstrate:

1. A functional web frontend.
2. A custom backend/API.
3. Communication between frontend and backend.
4. Integration with an external public API.
5. Persistent data storage using a NoSQL database.
6. CRUD operations.
7. Input validation and error handling.
8. A clear separation between external catalog data and application-specific data.

---

# 3. Technology Stack

## 3.1 Frontend

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Layout, styling, responsiveness, and visual design |
| JavaScript / TypeScript through React and Next.js | Frontend behavior and application logic |
| React.js | Component-based user interface |
| Next.js | Frontend framework and routing |
| Vercel | Planned frontend hosting |

### Frontend decision

The frontend will use **Next.js with React.js**.

The UI should remain component-based and modular.

The project should avoid unnecessary frontend libraries unless they solve a real project requirement.

---

## 3.2 Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| TypeScript | Backend programming language |
| Fastify | HTTP server and REST API framework |
| MongoDB Node.js Driver | MongoDB access |
| Fastify schemas / JSON Schema | Request validation and response serialization |
| dotenv / environment variables | Configuration and secret management |

### Backend decision

The backend will use:

```text
Node.js
+
TypeScript
+
Fastify
```

The backend is mandatory and must contain real application logic.

The frontend must not access MongoDB directly.

The frontend should normally access TMDB through the project's backend rather than exposing the TMDB access token in the browser.

---

## 3.3 Database

| Technology | Purpose |
|---|---|
| MongoDB | NoSQL persistent database |
| MongoDB Node.js Driver | Application/database communication |
| MongoDB Atlas or another MongoDB-compatible host | Possible cloud database hosting |

### Database model

The initial data model uses two main collections:

```text
library
playlists
```

The application stores only information that belongs to the user/application.

TMDB remains the source of external catalog data.

---

## 3.4 External API

### TMDB API

TMDB (The Movie Database) is the external public API used to retrieve movie and TV series information.

Expected usage includes:

- movie search;
- TV series search;
- movie details;
- TV series details;
- posters and images;
- genres;
- release dates;
- cast/credits;
- seasons/episode metadata where relevant.

The backend is responsible for communicating with TMDB.

The TMDB access token must be stored as an environment variable.

Example:

```env
TMDB_TOKEN=your_token_here
```

The token must never be:

- hard-coded in source code;
- committed to Git;
- exposed to the frontend;
- stored in public configuration.

---

# 4. Programming Languages

## Required

### TypeScript

Primary backend programming language.

Used for:

- Fastify server;
- routes;
- controllers;
- services;
- database access;
- TMDB integration;
- validation types;
- application models/types.

### JavaScript / JSX / TSX

Used through the React/Next.js frontend.

The project may use TypeScript/TSX on the frontend when appropriate.

### HTML5

Used through Next.js/React for semantic page structure.

### CSS3

Used for the visual interface.

---

# 5. Frameworks and Core Libraries

## Backend

```text
Node.js
Fastify
TypeScript
MongoDB Node.js Driver
```

## Frontend

```text
Next.js
React
HTML5
CSS3
```

## External service

```text
TMDB API
```

---

# 6. Development Environment

## Operating System

The project should be developed in an environment capable of running:

- Node.js;
- npm, pnpm, or another compatible package manager;
- Git;
- a modern web browser;
- MongoDB local instance or MongoDB Atlas.

The development environment is not restricted to a specific operating system.

---

# 7. Required Software

The development machine should have:

### 7.1 Node.js

Required for both frontend and backend development.

Use an active LTS version whenever possible.

Verify installation:

```bash
node --version
```

### 7.2 Package manager

A package manager is required.

Preferred option:

```bash
pnpm
```

However, `npm` may be used when necessary.

Do not mix package managers in the same project unless there is a specific reason.

### 7.3 Git

Required for version control.

### 7.4 Code editor

Visual Studio Code is the recommended editor.

### 7.5 Web browser

A modern Chromium-based browser or another modern browser compatible with the application.

### 7.6 MongoDB

One of the following:

- local MongoDB installation;
- MongoDB Atlas.

For a hosted application, MongoDB Atlas is a suitable option.

---

# 8. Environments

The project should conceptually support three environments:

```text
Development
Testing
Production
```

## 8.1 Development

Used during local implementation.

Typical URLs:

```text
Frontend:
http://localhost:3000

Backend:
http://localhost:3001
```

These ports are defaults only and may be changed if necessary.

## 8.2 Testing

Used to validate:

- API requests;
- persistence;
- validation;
- error handling;
- frontend/backend integration.

The project does not require a dedicated test server for the initial academic MVP.

## 8.3 Production

Planned hosting:

```text
Frontend → Vercel
Backend → To be defined
Database → MongoDB Atlas or equivalent
```

The backend hosting provider has not been selected yet.

Do not assume a specific backend hosting platform unless explicitly decided later.

---

# 9. Environment Variables

The application must use environment variables for secrets and environment-specific configuration.

Example backend `.env`:

```env
NODE_ENV=development
PORT=3001

TMDB_TOKEN=your_tmdb_bearer_token

MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=movie_manager

CORS_ORIGIN=http://localhost:3000
```

Example production variables may include:

```env
NODE_ENV=production
PORT=3001

TMDB_TOKEN=...
MONGODB_URI=...
MONGODB_DATABASE=...
CORS_ORIGIN=...
```

### Important

Never commit `.env` files containing real credentials.

Use:

```text
.env
```

in `.gitignore`.

A safe example file may be provided as:

```text
.env.example
```

---

# 10. Functional Scope

## 10.1 Search movies and TV series

The user must be able to search for:

- movies;
- TV series.

The search should be performed through the backend.

Suggested endpoint:

```http
GET /api/search?query={query}
```

---

## 10.2 View title details

The application must display information such as:

### Movies

- poster;
- title;
- original title where useful;
- overview/synopsis;
- release year/date;
- genres;
- runtime;
- cast;
- TMDB rating;
- other relevant metadata.

### TV series

- poster;
- title;
- overview/synopsis;
- first air date;
- genres;
- seasons;
- episodes;
- cast;
- TMDB rating;
- other relevant metadata.

Suggested endpoints:

```http
GET /api/movies/tmdb/:id
GET /api/series/tmdb/:id
```

---

## 10.3 Personal library

The user must be able to save a movie or TV series to a personal library.

Suggested endpoints:

```http
GET    /api/library
POST   /api/library
GET    /api/library/:id
PATCH  /api/library/:id
DELETE /api/library/:id
```

---

## 10.4 Playlists

The user must be able to create personal playlists.

Examples:

```text
Favorites
Watch Later
Watched
Horror
Science Fiction
Weekend Movies
```

Suggested endpoints:

```http
GET    /api/playlists
POST   /api/playlists
GET    /api/playlists/:id
PATCH  /api/playlists/:id
DELETE /api/playlists/:id
```

---

## 10.5 Add/remove titles from playlists

Suggested endpoints:

```http
POST   /api/playlists/:playlistId/items
DELETE /api/playlists/:playlistId/items/:itemId
```

A title may belong to more than one playlist.

---

## 10.6 Personal rating

The user can assign a personal rating from:

```text
0 to 10
```

This rating is separate from the TMDB rating.

Example:

```text
TMDB rating: 8.7
My rating: 9.0
```

The personal rating must be persisted in MongoDB.

---

## 10.7 Written review

The user can write a personal review for a saved title.

The review belongs to the user's library record.

A separate review collection is not required for the initial architecture because the application has only one user and one review per saved title.

---

## 10.8 Edit review/rating

The user can update:

- personal rating;
- written review.

Suggested endpoint:

```http
PATCH /api/library/:id
```

---

## 10.9 Remove review/rating

Removing an evaluation must not necessarily remove the title from the library.

Suggested endpoint:

```http
DELETE /api/library/:id/review
```

or an equivalent partial update.

---

# 11. Out of Scope

The following features are explicitly excluded from the initial project:

- multi-user authentication;
- user registration;
- user login;
- social profiles;
- comments from other users;
- chat;
- notifications;
- individual episode tracking;
- streaming service integration;
- AI-generated recommendations;
- image uploads;
- multiple external movie APIs;
- synchronization with a TMDB user account;
- complex social functionality;
- real-time collaborative features.

Do not implement out-of-scope functionality unless the user explicitly changes the project requirements.

---

# 12. Data Ownership Rules

One of the most important architectural rules is the separation between **TMDB data** and **application data**.

## TMDB owns/provides

Examples:

- title;
- synopsis;
- poster path;
- genres;
- cast;
- release date;
- number of seasons;
- number of episodes;
- TMDB rating.

## MongoDB stores

Examples:

- saved title;
- personal playlists;
- personal rating;
- personal review;
- creation date;
- update date;
- application-specific status.

The application should not attempt to duplicate the entire TMDB catalog in MongoDB.

Only save the data necessary for the application's own functionality.

---

# 13. Suggested MongoDB Data Model

## `library`

Example:

```json
{
  "_id": "ObjectId",
  "tmdbId": 157336,
  "mediaType": "movie",
  "title": "Interstellar",
  "posterPath": "/example.jpg",
  "playlists": [
    "ObjectId('...')"
  ],
  "rating": 9,
  "review": "Excellent movie.",
  "createdAt": "2026-09-15T00:00:00.000Z",
  "updatedAt": "2026-09-15T00:00:00.000Z"
}
```

## `playlists`

Example:

```json
{
  "_id": "ObjectId",
  "name": "Favorites",
  "description": "My favorite titles",
  "createdAt": "2026-09-15T00:00:00.000Z",
  "updatedAt": "2026-09-15T00:00:00.000Z"
}
```

### Duplicate prevention

A title should be considered unique by:

```text
tmdbId + mediaType
```

The same numeric TMDB ID may exist for different media types, so `tmdbId` alone must not be assumed to be globally unique inside the application's data model.

A compound unique index should be considered for:

```text
tmdbId
mediaType
```

---

# 14. REST API Conventions

The backend should expose a REST-style HTTP API.

Use HTTP methods according to their intended purpose:

```text
GET     → read
POST    → create
PATCH   → partial update
DELETE  → remove
```

Return JSON.

Use meaningful HTTP status codes.

Suggested examples:

```text
200 OK
201 Created
204 No Content
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error
```

Error responses should be predictable and machine-readable.

Example:

```json
{
  "error": "TITLE_ALREADY_EXISTS",
  "message": "This title is already in the library."
}
```

---

# 15. Backend Architecture

The backend should preferably be organized by feature/module.

Suggested structure:

```text
backend/
├── src/
│   ├── server.ts
│   ├── app.ts
│   │
│   ├── config/
│   │   └── env.ts
│   │
│   ├── database/
│   │   └── mongodb.ts
│   │
│   ├── modules/
│   │   ├── search/
│   │   │   ├── search.routes.ts
│   │   │   ├── search.controller.ts
│   │   │   └── search.service.ts
│   │   │
│   │   ├── tmdb/
│   │   │   └── tmdb.service.ts
│   │   │
│   │   ├── library/
│   │   │   ├── library.routes.ts
│   │   │   ├── library.controller.ts
│   │   │   ├── library.service.ts
│   │   │   └── library.repository.ts
│   │   │
│   │   └── playlists/
│   │       ├── playlists.routes.ts
│   │       ├── playlists.controller.ts
│   │       ├── playlists.service.ts
│   │       └── playlists.repository.ts
│   │
│   └── schemas/
│       └── ...
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

This organization is a recommendation, not an immutable requirement.

If the project remains small, avoid unnecessary architectural complexity.

---

# 16. Frontend Architecture

Suggested Next.js structure:

```text
frontend/
├── app/
│   ├── page.tsx
│   ├── buscar/
│   │   └── page.tsx
│   ├── filmes/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── series/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── minha-colecao/
│   │   └── page.tsx
│   └── playlists/
│       └── page.tsx
│
├── components/
│   ├── SearchBar.tsx
│   ├── MediaCard.tsx
│   ├── MediaGrid.tsx
│   ├── Rating.tsx
│   ├── ReviewForm.tsx
│   ├── PlaylistSelector.tsx
│   └── PlaylistCard.tsx
│
├── services/
│   └── api.ts
│
└── styles/
```

Keep components focused and reusable.

---

# 17. Frontend ↔ Backend Communication

The frontend communicates with the custom backend through HTTP requests.

Example:

```text
React component
      ↓
API helper
      ↓
Fastify endpoint
      ↓
Business logic
      ↓
MongoDB / TMDB
```

The frontend must not directly access MongoDB.

For TMDB requests, the preferred architecture is:

```text
Frontend
   ↓
Own Fastify API
   ↓
TMDB
```

rather than:

```text
Frontend
   ↓
TMDB directly
```

This protects the TMDB credential and centralizes application logic.

---

# 18. Validation Rules

The backend must validate input before database operations.

Examples:

## Search

```text
query must exist
query must be a string
query must not be empty
```

## Rating

```text
rating must be numeric
rating >= 0
rating <= 10
```

## Playlist

```text
name required
name must not be empty
```

## TMDB ID

```text
must be a valid positive identifier
```

Validation belongs primarily to the backend even when the frontend also performs client-side validation.

---

# 19. Error Handling

The application should gracefully handle:

- invalid user input;
- TMDB authentication errors;
- TMDB not-found responses;
- TMDB rate limits;
- network failures;
- MongoDB connection failures;
- duplicate titles;
- missing images;
- unavailable metadata.

Never expose secrets or internal stack traces to end users.

---

# 20. UI / UX Rules

The interface should prioritize:

- clarity;
- simple navigation;
- readable typography;
- responsive behavior;
- useful loading states;
- useful empty states;
- useful error states.

Examples of empty states:

```text
No titles found.
```

```text
Your library is empty.
```

```text
This playlist has no titles yet.
```

Examples of loading states:

```text
Searching...
```

```text
Loading title details...
```

Avoid unnecessary animations and unnecessary visual complexity.

---

# 21. Security Rules

Even though the application has only one user, basic security practices remain mandatory.

## Secrets

Never expose:

- TMDB token;
- MongoDB connection string;
- other private credentials.

## Environment variables

Use `.env` for development secrets.

## Git

Do not commit:

```text
.env
node_modules/
.next/
dist/
```

Use `.env.example` without real credentials.

## CORS

Configure CORS explicitly instead of allowing every origin by default in production.

---

# 22. Git and Version Control

Use Git for version control.

Recommended branch approach for the small academic project:

```text
main
```

Optionally:

```text
main
develop
feature/*
```

Do not create unnecessary branching complexity for a small project.

Commit messages should describe the change clearly.

Examples:

```text
feat: add TMDB search endpoint
feat: create playlist CRUD
fix: prevent duplicate library entries
feat: add personal rating
```

---

# 23. Code Quality Rules

When modifying the project:

1. Prefer simple solutions.
2. Reuse existing project patterns.
3. Avoid unnecessary dependencies.
4. Do not introduce a framework or library without a clear reason.
5. Keep business logic out of UI components when possible.
6. Keep TMDB integration isolated from MongoDB persistence logic.
7. Validate backend inputs.
8. Handle API and database errors explicitly.
9. Preserve existing functionality when adding features.
10. Do not refactor unrelated code unless necessary.

---

# 24. AI Development Rules

This README is also a **context and instruction document for AI coding assistants**.

Whenever an AI model receives a request to modify this project, it should use this document as the project's baseline context.

## AI must preserve

- the selected technology stack;
- the one-user/no-authentication scope;
- the TMDB + custom backend + MongoDB architecture;
- the separation between external data and application data;
- the existing project conventions;
- existing working functionality.

## AI must not assume

- a specific backend hosting provider;
- multi-user support;
- authentication;
- PostgreSQL or another SQL database;
- a different frontend framework;
- a different movie API;
- direct frontend access to MongoDB;
- direct frontend access to TMDB using a secret token;
- features that were explicitly marked out of scope.

## Before changing code

The AI should:

1. Inspect the existing project structure.
2. Identify the relevant frontend/backend module.
3. Reuse existing services, components, and utilities when possible.
4. Make the smallest coherent change required by the request.
5. Avoid changing unrelated files.
6. Preserve existing API contracts unless the request explicitly requires a change.

## When requirements are ambiguous

Prefer the simplest implementation that:

- fits the current architecture;
- satisfies the user's explicit request;
- does not expand the project scope.

Do not silently introduce major architectural decisions.

## When adding dependencies

An AI assistant should prefer existing dependencies.

A new dependency should be added only when:

- it is necessary;
- the native platform/framework is insufficient;
- it clearly reduces complexity or implementation risk.

---

# 25. Definition of Done

A feature should generally be considered complete when:

- the frontend supports the intended interaction;
- the backend endpoint exists when needed;
- validation is implemented;
- persistence works when applicable;
- success and error states are handled;
- the feature integrates with existing architecture;
- no credentials are exposed;
- existing functionality still works.

---

# 26. Development Priority

The recommended implementation order is:

```text
1. Project setup
2. MongoDB connection
3. Fastify base API
4. TMDB integration
5. Search
6. Movie/series details
7. Personal library
8. Playlist CRUD
9. Add/remove titles from playlists
10. Personal rating
11. Written review
12. Edit/remove evaluation
13. Filters and UX refinement
14. Deployment
```

This order should be adjusted only when a technical dependency requires it.

---

# 27. Current Hosting Plan

## Frontend

Planned:

```text
Vercel
```

## Backend

```text
To be defined
```

Do not assume that the backend will be hosted on Vercel unless explicitly decided.

## Database

Preferred cloud option:

```text
MongoDB Atlas
```

The exact production configuration may be decided later.

---

# 28. Current Project Constraints

The application is an academic project with a limited development period.

Therefore:

- prioritize the MVP;
- avoid overengineering;
- avoid unnecessary abstractions;
- avoid unnecessary third-party services;
- prefer readable code;
- implement core functionality before optional enhancements.

The goal is a complete and understandable application, not a production-scale social platform.

---

# 29. MVP Summary

The minimum complete application should allow the user to:

```text
Search movies and TV series
        ↓
View title details
        ↓
Save title to personal library
        ↓
Create/manage playlists
        ↓
Add title to playlist(s)
        ↓
Give personal rating
        ↓
Write review
        ↓
Edit review/rating
        ↓
Remove review/rating
        ↓
Browse personal collection
```

---

# 30. Key Architectural Principle

The most important rule of the project is:

> **TMDB provides external catalog information. MongoDB persists the user's application-specific information. Fastify is the application's own API and business-logic layer. Next.js/React is the presentation layer.**

Any implementation decision should preserve this separation unless the project requirements are explicitly changed.

---

# 31. Attribution

The application uses the TMDB API.

The project must comply with TMDB's current attribution and usage requirements.

The application should display the required TMDB notice/attribution in an appropriate location according to TMDB's documentation.

Suggested notice:

> This product uses the TMDB API but is not endorsed or certified by TMDB.

This project is academic and non-commercial.

---

# 32. Quick Reference

## Stack

```text
Frontend:
Next.js
React
HTML5
CSS3

Backend:
Node.js
TypeScript
Fastify

Database:
MongoDB

External API:
TMDB API

Frontend hosting:
Vercel

Backend hosting:
TBD
```

## Main application data

```text
library
playlists
```

## Main concepts

```text
TMDB ID
media type
personal library
playlist
personal rating
personal review
```

## Authentication

```text
No multi-user authentication
```

## Database type

```text
NoSQL / MongoDB
```

## API style

```text
REST
JSON
HTTP
```

## Development ports

```text
Frontend: 3000
Backend: 3001
```

---

# 33. Final Instruction for AI Assistants

Treat this README as the baseline project specification.

When the user asks for a command, code change, new feature, bug fix, refactor, installation step, or architectural decision:

1. Use this README as context.
2. Follow the selected stack.
3. Respect the project scope.
4. Inspect existing code before proposing structural changes.
5. Prefer the simplest implementation consistent with the architecture.
6. Do not replace technologies without explicit user approval.
7. Do not add authentication or other out-of-scope functionality.
8. Keep TMDB credentials on the backend.
9. Keep MongoDB access on the backend.
10. Keep the frontend responsible for presentation and user interaction.
11. Explain any necessary architectural change before making it.
12. When giving commands, make them compatible with the current project structure and package manager.

If the current codebase conflicts with this README, the actual existing implementation should be inspected first. Do not blindly rewrite the project just to match this document.
