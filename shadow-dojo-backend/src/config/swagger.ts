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
      '/departments': {
        get: {
          summary: 'Get all departments for the company',
          tags: ['Departments'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of departments retrieved successfully' },
            401: { description: 'Unauthorized' },
            403: { description: 'Forbidden (Requires COMPANY_ADMIN)' }
          }
        },
        post: {
          summary: 'Create a new department',
          tags: ['Departments'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: { name: { type: 'string', example: 'Engineering' } }
                }
              }
            }
          },
          responses: { 201: { description: 'Department created' } }
        }
      },
      '/departments/{id}': {
        patch: {
          summary: 'Update a department',
          tags: ['Departments'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { name: { type: 'string', example: 'Product Development' } }
                }
              }
            }
          },
          responses: { 200: { description: 'Department updated' } }
        },
        delete: {
          summary: 'Delete a department',
          tags: ['Departments'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Department deleted' } }
        }
      },
      '/teams': {
        get: {
          summary: 'Get all teams for the company',
          tags: ['Teams'],
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'List of teams retrieved successfully' } }
        },
        post: {
          summary: 'Create a new team',
          tags: ['Teams'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string', example: 'Frontend Wizards' },
                    departmentId: { type: 'string', format: 'uuid' },
                    leadId: { type: 'string', format: 'uuid' }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Team created' } }
        }
      },
      '/employees/invite': {
        post: {
          summary: 'Invite a new employee',
          tags: ['Employees'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email'],
                  properties: {
                    email: { type: 'string', example: 'newhire@acme.com' },
                    role: { type: 'string', enum: ['MANAGER', 'EMPLOYEE'], default: 'EMPLOYEE' }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Invitation sent' } }
        }
      },
      '/employees/bulk-invite': {
        post: {
          summary: 'Bulk invite employees',
          tags: ['Employees'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['employees'],
                  properties: {
                    employees: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          email: { type: 'string' },
                          role: { type: 'string', enum: ['MANAGER', 'EMPLOYEE'] }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Bulk invitations processed' } }
        }
      },
      '/employees/{id}': {
        patch: {
          summary: 'Update an employee profile/role',
          tags: ['Employees'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    role: { type: 'string', enum: ['MANAGER', 'EMPLOYEE'] },
                    departmentId: { type: 'string', format: 'uuid' },
                    teamId: { type: 'string', format: 'uuid' },
                    status: { type: 'string', enum: ['ACTIVE', 'SUSPENDED'] }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Employee updated' } }
        }
      }
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);