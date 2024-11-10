import { Router } from 'express';
import { userRoutes } from './user.routes';
import { healthRoutes } from '../../routes/v1/health.routes';
import { createRateLimiter } from '../../middleware/rate-limit.middleware';
import { devRoutes } from './dev.routes';

const v1Router = Router();

// Apply rate limiting to all v1 routes
v1Router.use(createRateLimiter());

// Mount routes
v1Router.use('/users', userRoutes);
v1Router.use('/health', healthRoutes);
v1Router.use('/dev', devRoutes);


export { v1Router }; 