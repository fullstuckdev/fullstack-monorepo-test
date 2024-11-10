import { User } from '../../../domain/entities/user.entity';

export interface UpdateUserDTO {
  displayName?: string;
  photoURL?: string;
  role?: string;
  isActive?: boolean;
}

export interface IUpdateUserUseCase {
  execute(userId: string, data: UpdateUserDTO): Promise<User>;
}

export interface IFetchUsersUseCase {
  execute(): Promise<{ users: User[], total: number }>;
} 