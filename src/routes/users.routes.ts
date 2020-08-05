import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensuredAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

export const usersRepository = new UsersRepository();

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

usersRouter.patch(
  '/avatar',
  ensuredAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
