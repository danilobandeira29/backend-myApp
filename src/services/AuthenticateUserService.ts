import { sign } from 'jsonwebtoken';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import authConfig from '../config/auth';

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

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
