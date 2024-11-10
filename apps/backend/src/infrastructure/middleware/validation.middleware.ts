import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../utils/api-error';

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToClass(dtoClass, req.body);
    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      const errorMessages = errors.map(error => 
        Object.values(error.constraints || {})
      ).flat();
      
      next(new ApiError(400, errorMessages.join(', ')));
      return;
    }

    req.body = dtoObj;
    next();
  };
} 