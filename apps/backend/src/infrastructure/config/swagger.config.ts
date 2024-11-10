import dotenv from 'dotenv';
dotenv.config();

import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for User Management',
      contact: {
        name: 'Taufik Mulyawan',
        email: 'taufikmulyawan@gmail.com',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header'
        },
      },
    },
    security: [{
      BearerAuth: []
    }],
    tags: [
      {
        name: 'Users',
        description: 'User management endpoints'
      },
      {
        name: 'Development',
        description: 'Development helper endpoints'
      }
    ]
  },
  apis: [
    './src/interfaces/routes/*.ts',
    './src/infrastructure/routes/v1/*.ts',
    './src/interfaces/controllers/*.ts'
  ],
};

export const swaggerSpec = swaggerJsdoc(options);