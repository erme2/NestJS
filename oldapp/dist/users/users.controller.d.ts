import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(): User[];
    getUserById(idVar: number): User;
    newUser(requestBody: CreateUserDto): User;
}
