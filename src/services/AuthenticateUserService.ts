import { sign } from 'jsonwebtoken';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface IRequest {
  password: string;
  email: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ password, email }: IRequest): IResponse {
    const user = this.usersRepository.findEmailExists(email);

    if (!user) {
      throw new AppError('Incorrect e-mail/password combination', 401);
    }

    if (user.password !== password) {
      throw new AppError('Incorrect e-mail/password combination', 401);
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
