import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class User {
    @ApiProperty()
    @IsInt()
    id: number;
    @ApiProperty()
    name: string;
}
