import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [
      { id: 1, name: 'erme2' },
      { id: 2, name: 'test123' },
    ];

  findAll(queryName?: string): User[] {
    if (queryName) {
      console.log(queryName);
    }
    return this.users;
  }

  findById(userId: number): User {
    for (const k in this.users) {
      if (this.users[k].id == userId) {
        return this.users[k];
      }
    }
    return null;
  }

  createUser(name: string): User {
    // this will not stay anywhere :)
    const newUser = {
      id: this.users.length + 1,
      name: name,
    };
    return newUser;
  }
}
