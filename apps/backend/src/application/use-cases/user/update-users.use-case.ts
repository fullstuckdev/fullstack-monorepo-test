import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../interfaces/repositories/user-repository.interface';

export interface UpdateUserDTO {
  displayName?: string;
  photoURL?: string;
  role?: string;
  isActive?: boolean;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (data.displayName) {
      user.updateName(data.displayName);
    }
    if (data.photoURL) {
      user.updatePhoto(data.photoURL);
    }
    if (data.role) {
      user.updateRole(data.role);
    }
    if (typeof data.isActive === 'boolean') {
      user.updateStatus(data.isActive);
    }

    await this.userRepository.update(user);
    return user;
  }
} 