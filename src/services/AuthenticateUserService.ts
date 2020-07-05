import { sign } from 'jsonwebtoken';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  password: string;
  email: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ password, email }: Request): Response {
    const user = this.usersRepository.findEmailExists(email);

    if (!user) {
      throw Error('Incorrect e-mail/password combination');
    }

    if (user.password !== password) {
      throw Error('Incorrect e-mail/password combination');
    }

    const token = sign(
      {},
      'A63AB36162A4F4EE6622CCD787B0A048C26B93ACFC05C6B1843659B253C3C00B',
      {
        subject: user.id,
        expiresIn: '60s',
      },
    );

    return { user, token };
  }
}

export default AuthenticateUserService;
