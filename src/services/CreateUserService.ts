import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

import AppError from '../errors/AppError';

interface RequestData {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ name, email, password }: RequestData): User {
    const existUserEmail = this.usersRepository.findEmailExists(email);

    if (existUserEmail) {
      throw new AppError('This e-mail is already used!');
    }

    const user = this.usersRepository.create({ name, email, password });

    return user;
  }
}

export default CreateUserService;
