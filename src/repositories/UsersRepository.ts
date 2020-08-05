import User from '../models/User';

interface IUserData {
  name: string;
  email: string;
  password: string;
}
class UsersRepository {
  public users: User[] = [
    {
      id: '123123213',
      name: 'Danilo',
      email: 'danilobandeira@gmail.com',
      password: '123456',
      avatar: null,
    },
  ];

  public create({ name, email, password }: IUserData): User {
    const user = new User({ name, email, password });

    this.users.push(user);

    return user;
  }

  public save(user: User): User {
    const userIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[userIndex] = user;

    return user;
  }

  public findEmailExists(email: string): User | undefined {
    const result = this.users.find(user => user.email === email);

    return result;
  }

  public findById(id: string): User | undefined {
    const result = this.users.find(user => user.id === id);

    return result;
  }

  public all(): User[] {
    return this.users;
  }
}

export default UsersRepository;
