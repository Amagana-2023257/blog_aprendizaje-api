// src/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "API para la gestión de publicaciones y comentarios del blog",
      contact: {
        name: "Equipo de Desarrollo",
        email: "soporte@blog.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/blog/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      responses: {
        Unauthorized: {
          description: "Token faltante o inválido",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "Token no proporcionado" },
                },
              },
            },
          },
        },
        Forbidden: {
          description: "El usuario no tiene el rol necesario",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "Usuario no autorizado. Se requiere ADMIN_ROLE",
                  },
                },
              },
            },
          },
        },
        InternalError: {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "Error interno al procesar la solicitud",
                  },
                  error: { type: "string", example: "Detalle del error interno" },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/post/post.routes.js",
    "./src/comment/comment.routes.js",
  ],
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };
