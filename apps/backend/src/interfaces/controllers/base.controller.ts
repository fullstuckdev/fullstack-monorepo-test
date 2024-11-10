import { Router } from 'express';
import { RouteDefinition } from '../../infrastructure/decorators/route.decorator';

export abstract class BaseController {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const routes: RouteDefinition[] = Reflect.getMetadata('routes', this.constructor) || [];

    routes.forEach((route) => {
      const { method, path, methodName, middleware } = route;
      const handler = (this as any)[methodName].bind(this);
      
      if (middleware && middleware.length > 0) {
        this.router[method](path, ...middleware, handler);
      } else {
        this.router[method](path, handler);
      }
    });
  }
}