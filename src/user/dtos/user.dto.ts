import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/common/types/paginator/baseQuery.dto';
import { IQueryDto } from 'src/common/types/paginator/paginator.type';
import { IUserEntity } from '../entities/user.entity';
import { Exclude, Expose } from 'class-transformer';
import { IUserRbacEntity } from 'src/rbac/entities/user.entity';
import { IAssigmentRbacEntity } from 'src/rbac/entities/assignment.entity';

@Exclude()
export class UserDto implements IUserEntity, IUserRbacEntity {
  @Expose() readonly id: number;
  @Expose() readonly email: string;

  readonly hashPassword: string;
  readonly assignments?: IAssigmentRbacEntity[];
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
