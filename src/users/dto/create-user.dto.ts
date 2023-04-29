import { ApiProperty } from '@nestjs/swagger';
import {
    IsAlphanumeric,
    MaxLength,
    MinLength,
    isAlphanumeric,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ minLength: 5, maxLength: 10 })
    @IsAlphanumeric()
    @MinLength(5)
    @MaxLength(10)
    name: string;
}
