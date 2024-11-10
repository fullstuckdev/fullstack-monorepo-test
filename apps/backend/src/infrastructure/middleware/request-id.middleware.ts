import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.requestId = req.header('X-Request-ID') || uuidv4();
  res.setHeader('X-Request-ID', req.requestId);
  next();
}; 