import rateLimit from 'express-rate-limit';
import { ApiError } from '../../utils/api-error';

export const createRateLimiter = (
  windowMs: number = 15 * 60 * 1000, // 15 minutes
  max: number = 100 // limit each IP to 100 requests per windowMs
) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      error: 'Too many requests, please try again later.'
    },
    handler: (req, res, next, options) => {
      next(new ApiError(429, 'Too many requests, please try again later.'));
    }
  });
}; 