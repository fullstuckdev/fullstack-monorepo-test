import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../utils/api-error';
import { SwaggerResponse } from '../types/swagger.types';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response<SwaggerResponse<never>>,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    return res.status(error.code).json({
      success: false,
      error: error.message
    });
  }

  return res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};