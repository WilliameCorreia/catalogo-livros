# Catálogo de Livros

Sistema de gestão de catálogo de livros com cadastro, listagem, edição e exclusão. Arquitetura de microsserviços com backend Node.js e frontend Next.js, totalmente dockerizado.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Rodando com Docker](#rodando-com-docker)
- [Rodando em Desenvolvimento Local](#rodando-em-desenvolvimento-local)
- [API REST](#api-rest)
- [Testes](#testes)
- [Segurança](#segurança)

---

## Visão Geral

O sistema permite gerenciar um catálogo de livros com as seguintes funcionalidades:

- Listar todos os livros cadastrados
- Cadastrar novo livro (título, autor, categoria)
- Editar livro existente
- Excluir livro com confirmação via modal customizado
- Tema claro/escuro com paletas de cores profissionais
- Notificações de feedback (toasts) sem depender de alerts nativos do navegador

---

## Stack Tecnológico

### Backend
| Tecnologia | Versão | Uso |
|---|---|---|
| Node.js | 22 | Runtime |
| TypeScript | 6 | Tipagem estática |
| Express | 5 | Framework HTTP |
| Prisma | 5 | ORM |
| PostgreSQL | 16 | Banco de dados |
| Zod | 4 | Validação de schemas |
| Helmet | 8 | Headers de segurança HTTP |
| express-rate-limit | 8 | Rate limiting |
| Jest + ts-jest | 29 | Testes unitários |

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 16 | Framework React com App Router |
| React | 19 | UI |
| TypeScript | 5 | Tipagem estática |
| Tailwind CSS | 4 | Estilização |
| next-themes | 0.4 | Gerenciamento de tema |
| Axios | 1 | Chamadas HTTP |

### Infraestrutura
| Tecnologia | Uso |
|---|---|
| Docker + Docker Compose | Orquestração dos serviços |
| Multi-stage Dockerfile | Imagens otimizadas para produção |

---

## Arquitetura

### Backend — Clean Architecture

```
Domain → Application → Infrastructure → Interface
  ↑                                        ↓
  └────────── depende via interface ───────┘
```

| Camada | Responsabilidade | Exemplos |
|---|---|---|
| **Domain** | Entidades e contratos | `Book`, `IBookRepository` |
| **Application** | Regras de negócio | `CreateBookUseCase`, `DeleteBookUseCase` |
| **Infrastructure** | Acesso a dados | `PrismaBookRepository` |
| **Interface** | HTTP / Controllers | `BookController`, middlewares, rotas |

**Princípios SOLID aplicados:**
- **SRP** — cada classe tem uma única responsabilidade
- **OCP** — novos repositórios sem alterar use cases
- **LSP** — `PrismaBookRepository` substitui `IBookRepository` sem quebrar contrato
- **ISP** — interface mínima (`findAll`, `findById`, `create`, `update`, `delete`)
- **DIP** — use cases dependem da interface, não da implementação concreta

### Frontend — Componentização

```
app/
├── layout.tsx          → ThemeProvider + ToastProvider + ConfirmProvider
├── page.tsx            → Home
└── books/page.tsx      → Catálogo (gerencia estado via useBooks hook)

components/
├── ui/                 → Primitivos reutilizáveis (Button, Input, Modal, Toast)
├── books/              → Feature-scoped (BookCard, BookList, BookForm)
└── layout/             → Header, ThemeProvider

contexts/               → ToastContext, ConfirmContext
hooks/                  → useBooks (CRUD + estado)
services/               → bookService (axios — isolado da UI)
types/                  → Book, CreateBookDto
```

---

## Estrutura do Projeto

```
catalogo_livros/
├── .env.example                    ← variáveis de ambiente (referência)
├── .gitattributes
├── .gitignore
├── docker-compose.yml
│
├── backend/
│   ├── Dockerfile
│   ├── .env.example
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── src/
│       ├── app.ts
│       ├── server.ts
│       ├── domain/
│       │   ├── entities/Book.ts
│       │   └── repositories/IBookRepository.ts
│       ├── application/
│       │   └── use-cases/
│       │       ├── ListBooksUseCase.ts
│       │       ├── CreateBookUseCase.ts
│       │       ├── UpdateBookUseCase.ts
│       │       ├── DeleteBookUseCase.ts
│       │       └── __tests__/
│       ├── infrastructure/
│       │   ├── database/prisma-client.ts
│       │   └── repositories/PrismaBookRepository.ts
│       └── interface/
│           ├── controllers/BookController.ts
│           ├── routes/book.routes.ts
│           ├── dtos/CreateBookDto.ts
│           └── middlewares/
│               ├── error-handler.ts
│               ├── validate-body.ts
│               ├── validate-uuid.ts
│               └── rate-limiter.ts
│
└── frontend/
    ├── Dockerfile
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── globals.css
        │   ├── page.tsx
        │   └── books/page.tsx
        ├── components/
        │   ├── ui/
        │   └── books/
        ├── contexts/
        ├── hooks/
        ├── services/
        └── types/
```

---

## Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando
- Para desenvolvimento local: Node.js 22+ e npm

---

## Configuração do Ambiente

**1. Clone o repositório**
```bash
git clone https://github.com/SEU_USUARIO/catalogo-livros.git
cd catalogo-livros
```

**2. Crie o arquivo `.env` na raiz** (usado pelo docker-compose)
```bash
cp .env.example .env
```
Edite `.env` e defina uma senha forte:
```env
POSTGRES_PASSWORD=sua_senha_forte_aqui
```

**3. Crie o arquivo `backend/.env`** (usado em desenvolvimento local)
```bash
cp backend/.env.example backend/.env
```
Edite `backend/.env`:
```env
DATABASE_URL="postgresql://catalogo:sua_senha_forte_aqui@localhost:5432/catalogo_livros"
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

> A senha em `backend/.env` deve ser a mesma definida em `.env` (raiz).

---

## Rodando com Docker

Sobe todos os serviços (banco, backend e frontend) com um único comando:

```bash
docker compose up --build
```

| Serviço | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001/api/books |
| PostgreSQL | interno (não exposto externamente) |

Para parar:
```bash
docker compose down
```

Para parar e remover os volumes (apaga os dados do banco):
```bash
docker compose down -v
```

---

## Rodando em Desenvolvimento Local

### 1. Suba apenas o banco de dados

```bash
docker compose up postgres -d
```

### 2. Backend

```bash
cd backend
npm install
npm run db:migrate     # aplica migrations no banco
npm run dev            # servidor na porta 3001
```

Comandos úteis do backend:

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor com hot-reload |
| `npm run build` | Compila TypeScript |
| `npm start` | Roda o build compilado |
| `npm test` | Executa testes unitários |
| `npm run db:migrate` | Aplica migrations |
| `npm run db:studio` | Abre o Prisma Studio (GUI do banco) |

### 3. Frontend

```bash
cd frontend
npm install
npm run dev            # servidor na porta 3000
```

Comandos úteis do frontend:

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor com hot-reload |
| `npm run build` | Gera build de produção |
| `npm start` | Roda o build de produção |
| `npm run lint` | Verifica lint |

---

## API REST

Base URL: `http://localhost:3001/api`

### Listar livros

```
GET /books
```

Resposta `200 OK`:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "category": "Tecnologia",
      "createdAt": "2026-04-18T00:00:00.000Z",
      "updatedAt": "2026-04-18T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

### Cadastrar livro

```
POST /books
Content-Type: application/json
```

Body:
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Tecnologia"
}
```

Resposta `201 Created`:
```json
{
  "id": "uuid",
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Tecnologia",
  "createdAt": "2026-04-18T00:00:00.000Z",
  "updatedAt": "2026-04-18T00:00:00.000Z"
}
```

### Editar livro

```
PUT /books/:id
Content-Type: application/json
```

Body: mesmo formato do POST. Resposta `200 OK` com o livro atualizado.

### Excluir livro

```
DELETE /books/:id
```

Resposta `204 No Content`.

### Categorias disponíveis

`Tecnologia`, `Ficção`, `Não Ficção`, `Ciência`, `História`, `Biografia`, `Romance`, `Autoajuda`, `Negócios`, `Outros`

### Códigos de erro

| Código | Situação |
|---|---|
| `400` | Body inválido (Zod validation) |
| `404` | Livro não encontrado |
| `422` | UUID inválido no parâmetro `:id` |
| `429` | Rate limit excedido |
| `500` | Erro interno do servidor |

---

## Testes

Os testes cobrem os use cases da camada de Application com mocks da interface `IBookRepository`.

```bash
cd backend
npm test
```

Casos testados:
- `CreateBookUseCase` — criação válida e validação de título vazio

Para rodar em modo watch durante desenvolvimento:
```bash
npm run test:watch
```

---

## Segurança

### Medidas implementadas

| Área | Medida |
|---|---|
| **Headers HTTP** | Helmet configura headers de segurança (CSP, HSTS, X-Frame-Options, etc.) |
| **CORS** | Whitelist via `ALLOWED_ORIGINS` — apenas origens explicitamente permitidas |
| **Rate Limiting** | 150 req/15min (geral) · 30 req/15min (escrita) por IP |
| **Validação** | Zod com `.strict()` (rejeita campos extras) e `.trim()` em todas as strings |
| **UUID** | Middleware valida formato UUID antes de chegar ao controller |
| **Body size** | Limite de 50kb no `express.json()` |
| **Erros** | Stack traces expostos apenas em `NODE_ENV=development` |
| **Credenciais** | Senha do banco via variável de ambiente — nunca commitada no repositório |
| **Container** | Backend e frontend rodam como usuário não-root nos containers Docker |

### Arquivos sensíveis

| Arquivo | Status |
|---|---|
| `.env` (raiz) | Ignorado pelo git — contém senha do PostgreSQL |
| `backend/.env` | Ignorado pelo git — contém DATABASE_URL |
| `.env.example` | Commitado — template sem valores reais |
| `backend/.env.example` | Commitado — template sem valores reais |
