import { User } from './entities/user.entity';
export declare class UsersService {
    private users;
    findAll(): User[];
    findById(userId: number): User;
    createUser(name: string): User;
}
