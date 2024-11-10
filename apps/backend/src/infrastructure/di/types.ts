export const TYPES = {
  // Repositories
  UserRepository: Symbol.for('UserRepository'),

  // Use Cases
  UpdateUserUseCase: Symbol.for('UpdateUserUseCase'),
  FetchUsersUseCase: Symbol.for('FetchUsersUseCase'),

  // Controllers
  UserController: Symbol.for('UserController'),
  DevController: Symbol.for('DevController'),

  // Services
  UserService: Symbol.for('UserService'),
}; 