import { Router } from 'express';
import { uuid } from 'uuidv4';

const usersRouter = Router();

interface UserInterface {
  name: string;
  email: string;
  password: string;
  id: string;
}

const users: UserInterface[] = [];

usersRouter.post('/', (request, response) => {
  const { name, email, password } = request.body;

  const existUserEmail = users.find(item => item.email === email);

  if (existUserEmail) {
    return response.status(400).json('This e-mail is already used!');
  }

  const user = {
    id: uuid(),
    name,
    email,
    password,
  };

  users.push(user);

  return response.json(user);
});

usersRouter.get('/', (request, response) => response.json(users));

export default usersRouter;
