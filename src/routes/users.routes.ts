import { Router } from 'express';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import ensuredAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const usersRepository = new UsersRepository();

usersRouter.post('/', (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService(usersRepository);

  const user = createUser.execute({ name, email, password });

  return response.json(user);
});

usersRouter.get('/', ensuredAuthenticated, (request, response) => {
  const users = usersRepository.all();

  return response.json(users);
});

export default usersRouter;
