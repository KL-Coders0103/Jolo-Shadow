import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shadow Dojo API',
      version: '1.0.0',
      description: 'API documentation for the multi-tenant SaaS platform.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      '/auth/register': {
        post: {
          summary: 'Register a new company and admin user',
          tags: ['Authentication'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['companyName', 'name', 'email', 'password'],
                  properties: {
                    companyName: { type: 'string', example: 'Acme Corp' },
                    industry: { type: 'string', example: 'Technology' },
                    name: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', example: 'admin@acme.com' },
                    password: { type: 'string', example: 'SecurePassword123' },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Company and Admin registered successfully',
            },
            400: {
              description: 'Validation failed',
            },
            409: {
              description: 'Email already in use',
            },
          },
        },
      },
      '/auth/login': {
        post: {
          summary: 'Log in an existing user',
          tags: ['Authentication'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', example: 'admin@acme.com' },
                    password: { type: 'string', example: 'SecurePassword123' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Login successful',
            },
            401: {
              description: 'Invalid credentials',
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);