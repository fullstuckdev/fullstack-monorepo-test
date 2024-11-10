import { Request, Response } from 'express';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-users.use-case';
import { IFetchUsersUseCase } from '../../application/interfaces/use-cases/user-use-cases.interface';
import { Get, Put } from '../../infrastructure/decorators/route.decorator';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { validateDto } from '../../infrastructure/middleware/validation.middleware';
import { UpdateUserDto } from '../../application/dtos/user.dto';
import { BaseController } from '../../interfaces/controllers/base.controller';
import { User } from '@fullstack/shared-types';
import { ApiResponse } from '../../utils/response-handler';

export class UserController extends BaseController {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly fetchUsersUseCase: IFetchUsersUseCase
  ) {
    super();
  }

  @Put('/update-user-data/:id', [AuthMiddleware.authenticate, validateDto(UpdateUserDto)])
  async updateUserData(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const updatedUser = await this.updateUserUseCase.execute(userId, req.body);
  
      const response: ApiResponse<User> = {
        success: true,
        message: 'User data updated successfully',
        data: updatedUser.toJSON()
      };
  
      return res.status(200).json(response);
    } catch (error) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: {
          code: 'UPDATE_FAILED',
          message: 'Failed to update user data'
        }
      };
      return res.status(500).json(errorResponse);
    }
  }

  @Get('/fetch-users-data', [AuthMiddleware.authenticate])
  async fetchUsers(req: Request, res: Response) {
    try {
      const result = await this.fetchUsersUseCase.execute();
      const response: ApiResponse<{ users: User[]; total: number }> = {
        success: true,
        data: {
          users: result.users,
          total: result.total
        },
        message: 'Users fetched successfully'
      };
      return res.status(200).json(response);
    } catch (error) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: {
          code: 'FETCH_FAILED',
          message: 'Failed to fetch users',}
      };
      return res.status(500).json(errorResponse);
    }
  }
} 