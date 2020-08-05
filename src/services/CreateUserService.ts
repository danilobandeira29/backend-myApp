import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

import AppError from '../errors/AppError';

interface IRequestData {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ name, email, password }: IRequestData): User {
    const existUserEmail = this.usersRepository.findEmailExists(email);

    if (existUserEmail) {
      throw new AppError('This e-mail is already used!');
    }

    const user = this.usersRepository.create({ name, email, password });

    return user;
  }
}

export default CreateUserService;
