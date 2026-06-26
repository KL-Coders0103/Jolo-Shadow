import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Jolo Shadow API",
      version: "1.0.0",
      description:
        "AI Powered Employee Training Platform API",
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    servers: [
      {
        url:
          "http://localhost:5000",
      },
    ],
  },

  apis: [
    "./src/docs/swagger/*.ts",
  ],
});

export const setupSwagger = (app: Express) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec),
  );
};