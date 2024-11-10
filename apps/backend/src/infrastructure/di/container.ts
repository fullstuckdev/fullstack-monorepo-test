import { Container } from 'inversify';
import { TYPES } from './types';
import { IUserRepository } from '../../application/interfaces/repositories/user-repository.interface';
import { FirebaseUserRepository } from '../repositories/firebase-user.repository';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-users.use-case';
import { FetchUsersUseCase } from '../../application/use-cases/user/fetch-users.use-case';
import { UserController } from '../../interfaces/controllers/user.controller';
import { DevController } from '../../interfaces/controllers/dev.controller';
import { IFetchUsersUseCase, IUpdateUserUseCase } from '../../application/interfaces/use-cases/user-use-cases.interface';

const container = new Container();

// Repositories
container.bind<IUserRepository>(TYPES.UserRepository).to(FirebaseUserRepository).inSingletonScope();

// Use Cases
container.bind<IUpdateUserUseCase>(TYPES.UpdateUserUseCase).to(UpdateUserUseCase);
container.bind<IFetchUsersUseCase>(TYPES.FetchUsersUseCase).to(FetchUsersUseCase);

// Controllers
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<DevController>(TYPES.DevController).to(DevController);

export { container }; 