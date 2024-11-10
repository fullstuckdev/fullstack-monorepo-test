import { User } from '../../../domain/entities/user.entity';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<void>;
  findAll(): Promise<User[]>;
} 