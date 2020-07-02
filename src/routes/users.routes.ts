import { Router } from 'express';

import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();

const users = new UsersRepository();

usersRouter.post('/', (request, response) => {
  const { name, email, password } = request.body;

  const existUserEmail = users.findEmailExists(email);

  if (existUserEmail) {
    return response.status(400).json('This e-mail is already used!');
  }

  const user = users.create({ name, email, password });

  return response.json(user);
});

usersRouter.get('/', (request, response) => response.json(users));

export default usersRouter;
