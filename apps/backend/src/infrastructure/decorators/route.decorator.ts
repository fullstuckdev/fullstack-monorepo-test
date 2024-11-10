import 'reflect-metadata';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch'
}

export interface RouteDefinition {
  path: string;
  method: HttpMethod;
  methodName: string;
  middleware: any[];
}

const ROUTES_METADATA_KEY = 'routes';

export function Route(method: HttpMethod, path: string, middleware: any[] = []) {
  return function (target: any, propertyKey: string) {
    const routes: RouteDefinition[] = Reflect.getMetadata(ROUTES_METADATA_KEY, target.constructor) || [];
    
    routes.push({
      path,
      method,
      methodName: propertyKey,
      middleware
    });
    
    Reflect.defineMetadata(ROUTES_METADATA_KEY, routes, target.constructor);
  };
}

export const Get = (path: string, middleware: any[] = []) => 
  Route(HttpMethod.GET, path, middleware);

export const Post = (path: string, middleware: any[] = []) => 
  Route(HttpMethod.POST, path, middleware);

export const Put = (path: string, middleware: any[] = []) => 
  Route(HttpMethod.PUT, path, middleware);

export const Delete = (path: string, middleware: any[] = []) => 
  Route(HttpMethod.DELETE, path, middleware);