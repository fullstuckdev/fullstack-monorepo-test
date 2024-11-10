import { Router } from 'express';
import { DevController } from '../../../interfaces/controllers/dev.controller';

/**
 * @swagger
 * tags:
 *   name: Development
 *   description: Development endpoints (not for production use)
 */

/**
 * @swagger
 * /api/v1/generate-token:
 *   get:
 *     summary: Generate a test token
 *     tags: [Development]
 *     responses:
 *       200:
 *         description: Token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "abc123..."
 *                     email:
 *                       type: string
 *                       example: "test@example.com"
 *                     token:
 *                       type: string
 *                       example: "eyJhbG..."
 *                     bearerToken:
 *                       type: string
 *                       example: "Bearer eyJhbG..."
 *                 message:
 *                   type: string
 *                   example: "Token generated successfully"
 *       500:
 *         description: Server error
 */

const router = Router();
const devController = new DevController();

// Mount the controller's router
router.use('/', devController.router);

export { router as devRoutes };