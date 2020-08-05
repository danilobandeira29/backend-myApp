import fs from 'fs';
import path from 'path';
import User from '../models/User';
import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';

import UsersRepository from '../repositories/UsersRepository';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const findUser = this.usersRepository.findById(userId);

    if (!findUser) {
      throw new AppError('Only authenticated user can change avatar');
    }

    if (findUser.avatar) {
      const userAvatarPathFile = path.join(
        uploadConfig.directory,
        findUser.avatar,
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarPathFile);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarPathFile);
      }
    }

    findUser.avatar = avatarFileName;

    this.usersRepository.save(findUser);

    return findUser;
  }
}

export default UpdateUserAvatarService;
