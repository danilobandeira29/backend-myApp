import { uuid } from 'uuidv4';

interface UserData {
  name: string;
  email: string;
  password: string;
}

class User {
  id: string;

  name: string;

  email: string;

  password: string;

  constructor({ name, email, password }: UserData) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export default User;
