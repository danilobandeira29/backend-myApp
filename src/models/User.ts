import { uuid } from 'uuidv4';

class User {
  id: string;

  name: string;

  email: string;

  password: string;

  avatar?: string | null;

  constructor({ name, email, password, avatar = null }: Omit<User, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
  }
}

export default User;
