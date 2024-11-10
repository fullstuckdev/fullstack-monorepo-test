import { Router } from "express";
import { UserController } from "../../../interfaces/controllers/user.controller";
import { UpdateUserUseCase } from "../../../application/use-cases/user/update-users.use-case";
import { FetchUsersUseCase } from "../../../application/use-cases/user/fetch-users.use-case";
import { FirebaseUserRepository } from "../../repositories/firebase-user.repository";

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDTO:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - name
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         email:
 *           type: string
 *           description: The user email
 *         name:
 *           type: string
 *           description: The user name
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * /api/v1/users/update-user-data/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update user data by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *                 example: "Taufik Mulyawan"
 *               photoURL:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *               role:
 *                 type: string
 *                 example: "user"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     displayName:
 *                       type: string
 *                     photoURL:
 *                       type: string
 *                     role:
 *                       type: string
 *                     isActive:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/users/fetch-users-data:
 *   get:
 *     tags: [Users]
 *     summary: Fetch all users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       email:
 *                         type: string
 *                       displayName:
 *                         type: string
 *                       photoURL:
 *                         type: string
 *                       role:
 *                         type: string
 *                       isActive:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *                 total:
 *                   type: number
 *                 message:
 *                   type: string
 */

const router = Router();
const userRepository = new FirebaseUserRepository();
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const fetchUsersUseCase = new FetchUsersUseCase(userRepository);

// Create controller and get its router
const userController = new UserController(updateUserUseCase, fetchUsersUseCase);
router.use('/', userController.router);

export { router as userRoutes };