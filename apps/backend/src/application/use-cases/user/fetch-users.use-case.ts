import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../interfaces/repositories/user-repository.interface';
import { IFetchUsersUseCase } from '../../interfaces/use-cases/user-use-cases.interface';

export class FetchUsersUseCase implements IFetchUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<{ users: User[], total: number }> {
    const users = await this.userRepository.findAll();
    return {
      users,
      total: users.length
    };
  }
} 