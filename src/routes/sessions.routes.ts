import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import { usersRepository } from './users.routes';

const sessionsRouter = Router();

sessionsRouter.post('/', (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService(usersRepository);

  const { user, token } = authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
