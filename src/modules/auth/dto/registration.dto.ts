import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class RegistrationDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'somemail@gmail.com',
  })
  @MaxLength(50)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'qwerty' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
