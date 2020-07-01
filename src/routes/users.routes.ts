import { Router } from 'express';

import User from '../models/User';

const usersRouter = Router();

interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
}

const users: UserInterface[] = [];

usersRouter.post('/', (request, response) => {
  const { name, email, password } = request.body;

  const existUserEmail = users.find(item => item.email === email);

  if (existUserEmail) {
    return response.status(400).json('This e-mail is already used!');
  }

  const user = new User({ name, email, password });

  users.push(user);

  return response.json(user);
});

usersRouter.get('/', (request, response) => response.json(users));

export default usersRouter;
