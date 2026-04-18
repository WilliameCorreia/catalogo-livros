import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Catálogo de Livros API",
      version: "1.0.0",
      description:
        "API REST para gestão de catálogo de livros. Permite listar, cadastrar, editar e excluir livros.",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Desenvolvimento local",
      },
    ],
    components: {
      schemas: {
        Book: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            title: {
              type: "string",
              example: "Clean Code",
            },
            author: {
              type: "string",
              example: "Robert C. Martin",
            },
            category: {
              type: "string",
              example: "Tecnologia",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-18T15:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-18T15:00:00.000Z",
            },
          },
        },
        BookInput: {
          type: "object",
          required: ["title", "author", "category"],
          properties: {
            title: {
              type: "string",
              minLength: 1,
              maxLength: 255,
              example: "Clean Code",
            },
            author: {
              type: "string",
              minLength: 1,
              maxLength: 255,
              example: "Robert C. Martin",
            },
            category: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Tecnologia",
              enum: [
                "Tecnologia",
                "Ficção",
                "Não Ficção",
                "Ciência",
                "História",
                "Biografia",
                "Romance",
                "Autoajuda",
                "Negócios",
                "Outros",
              ],
            },
          },
        },
        BookListResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/Book" },
            },
            total: {
              type: "integer",
              example: 1,
            },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: { type: "string", example: "title" },
                  message: { type: "string", example: "Título é obrigatório" },
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "Livro não encontrado" },
          },
        },
      },
    },
    paths: {
      "/api/books": {
        get: {
          tags: ["Livros"],
          summary: "Listar todos os livros",
          responses: {
            "200": {
              description: "Lista de livros retornada com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/BookListResponse" },
                },
              },
            },
            "500": {
              description: "Erro interno do servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        post: {
          tags: ["Livros"],
          summary: "Cadastrar novo livro",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/BookInput" },
              },
            },
          },
          responses: {
            "201": {
              description: "Livro cadastrado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Book" },
                },
              },
            },
            "400": {
              description: "Dados inválidos",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationError" },
                },
              },
            },
            "429": {
              description: "Muitas requisições — rate limit excedido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/books/{id}": {
        put: {
          tags: ["Livros"],
          summary: "Editar livro existente",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", format: "uuid" },
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/BookInput" },
              },
            },
          },
          responses: {
            "200": {
              description: "Livro atualizado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Book" },
                },
              },
            },
            "400": {
              description: "Dados inválidos",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationError" },
                },
              },
            },
            "404": {
              description: "Livro não encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "422": {
              description: "UUID inválido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "429": {
              description: "Muitas requisições — rate limit excedido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Livros"],
          summary: "Excluir livro",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", format: "uuid" },
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
          ],
          responses: {
            "204": {
              description: "Livro excluído com sucesso",
            },
            "404": {
              description: "Livro não encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "422": {
              description: "UUID inválido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "429": {
              description: "Muitas requisições — rate limit excedido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/health": {
        get: {
          tags: ["Sistema"],
          summary: "Health check",
          responses: {
            "200": {
              description: "Serviço operacional",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "ok" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
