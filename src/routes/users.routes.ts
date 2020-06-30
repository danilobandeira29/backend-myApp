import { Router } from 'express';
import { uuid } from 'uuidv4';

const usersRouter = Router();

const users: object[] = [];

usersRouter.post('/', (request, response) => {
  const { name, email, password } = request.body;

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
