import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  // tutti gli utenti
  getUsers(): User[] {
    return this.userService.findAll();
  }

  // utente: id
  @Get(':id')
  getUserById(@Param('id') idVar: number): User {
    return this.userService.findById(idVar);
  }

  @Post()
  newUser(@Body() requestBody: CreateUserDto): User {
    return this.userService.createUser(requestBody.name);
  }
}
