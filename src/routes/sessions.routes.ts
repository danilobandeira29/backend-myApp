import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import UsersRepository from '../repositories/UsersRepository';

const usersRepository = new UsersRepository();

const sessionsRouter = Router();

sessionsRouter.post('/', (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService(usersRepository);

  const { user, token } = authenticateUserService.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionsRouter;
