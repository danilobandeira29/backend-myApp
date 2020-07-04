import { Router } from 'express';

import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();

const usersRepository = new UsersRepository();

usersRouter.post('/', (request, response) => {
  const { name, email, password } = request.body;

  const existUserEmail = usersRepository.findEmailExists(email);

  if (existUserEmail) {
    return response.status(400).json('This e-mail is already used!');
  }

  const user = usersRepository.create({ name, email, password });

  return response.json(user);
});

usersRouter.get('/', (request, response) => {
  const users = usersRepository.all();

  return response.json(users);
});

export default usersRouter;
