import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Email identifier of user' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password for authentication' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
