import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from '../../interfaces/middleware/error.middleware';
import { swaggerSpec } from '../config/swagger.config';
import { requestIdMiddleware } from '../../infrastructure/middleware/request-id.middleware';
import { setupSecurityMiddleware } from '../../infrastructure/middleware/security.middleware';
import { createRateLimiter } from '../../infrastructure/middleware/rate-limit.middleware';
import { v1Router } from '../../infrastructure/routes/v1/index';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-users.use-case';
import { UserController } from '../../interfaces/controllers/user.controller';
import { FirebaseUserRepository } from '../repositories/firebase-user.repository';
import { FetchUsersUseCase } from '../../application/use-cases/user/fetch-users.use-case';
import { DevController } from '../../interfaces/controllers/dev.controller';
import dotenv from 'dotenv';
dotenv.config();

export class ExpressServer {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupSwagger();
  }

  private setupSwagger(): void {
    const options: swaggerUi.SwaggerUiOptions = {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: "API Documentation",
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'list',
        filter: true,
        displayRequestDuration: true,
      }
    };

    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, options)
    );
  }
  private setupRoutes(): void {
    // Initialize controllers with their dependencies
    const userRepository = new FirebaseUserRepository();
    const userController = new UserController(
      new UpdateUserUseCase(userRepository),
      new FetchUsersUseCase(userRepository)
    );
    const devController = new DevController();
  
    // Mount routes
    this.app.use('/v1/users', userController.router);
  
    // Development routes only in non-production
    if (process.env.NODE_ENV !== 'production') {
      this.app.use('/v1', devController.router);
    }
  
    // Error handling should be last
    this.app.use(errorHandler);
  }
  
  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(requestIdMiddleware);
    setupSecurityMiddleware(this.app);
    
    // Apply rate limiting to all routes
    this.app.use(createRateLimiter());
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
} 