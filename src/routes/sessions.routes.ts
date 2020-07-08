import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import UsersRepository from '../repositories/UsersRepository';

const usersRepository = new UsersRepository();

const sessionsRouter = Router();

sessionsRouter.post('/', (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
    );

    const { user, token } = authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
