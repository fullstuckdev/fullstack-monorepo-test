import { User } from '../../domain/entities/user.entity';
import { SwaggerResponse } from '../types/swagger.types';
import { UserDTO } from '../types/user.types';

export class UserPresenter {
  toResponse(user: User): SwaggerResponse<UserDTO> {
    return {
      success: true,
      data: user.toJSON()
    };
  }

  success(message: string): SwaggerResponse<never> {
    return {
      success: true,
      message
    };
  }

  error(message: string): SwaggerResponse<never> {
    return {
      success: false,
      error: message
    };
  }
} 