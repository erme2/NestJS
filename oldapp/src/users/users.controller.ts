import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOkResponse({ type: User, isArray: true })
    @ApiQuery({ name: 'name', required: false })
    @Get()
    // tutti gli utenti
    getUsers(@Query('name') queryName: string): User[] {
        return this.userService.findAll(queryName);
    }

    // utente: id
    @ApiOkResponse({ type: User })
    @ApiNotFoundResponse()
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) idVar: number): User {
        const response = this.userService.findById(idVar);
        if (response) {
            return response;
        }
        throw new NotFoundException();
    }

    @ApiCreatedResponse({ type: User })
    @Post()
    newUser(@Body() requestBody: CreateUserDto): User {
        return this.userService.createUser(requestBody.name);
    }
}
