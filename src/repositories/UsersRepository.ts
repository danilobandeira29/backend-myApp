import User from '../models/User';

interface UserData {
  name: string;
  email: string;
  password: string;
}
class UsersRepository {
  private users: User[] = [];

  constructor() {
    this.users = [
      {
        id: '123123213',
        name: 'Danilo',
        email: 'danilobandeira@gmail.com',
        password: '123456',
      },
    ];
  }

  public create({ name, email, password }: UserData): User {
    const user = new User({ name, email, password });

    this.users.push(user);

    return user;
  }

  public findEmailExists(email: string): User | null {
    const result = this.users.find(user => user.email === email);

    return result || null;
  }
}

export default UsersRepository;
