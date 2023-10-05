import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/common/types/paginator/baseQuery.dto';
import { IQueryDto } from 'src/common/types/paginator/paginator.type';
import { IUserEntity } from '../entities/user.entity';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto implements IUserEntity {
  @Expose() id: number;
  @Expose() email: string;

  hashPassword: string;
}

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

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email']),
) {}

export class FilterUserDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {}

export class QueryUserDto
  extends BaseQueryDto<FilterUserDto>
  implements IQueryDto<FilterUserDto> {}
