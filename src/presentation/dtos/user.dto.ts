import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { BaseQueryDto } from 'src/domain/common/paginator/baseQuery.dto';
import { IQueryDto } from 'src/domain/common/paginator/paginator.type';
import { IUserEntity, IUsersFilters } from 'src/domain/entities/IUser.entity';

@Exclude()
export class UserDto implements IUserEntity {
  @Expose() readonly id: number;
  @Expose() readonly email: string;
  @Expose() readonly name: string;

  readonly password: string;
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

  @ApiProperty({ description: 'Name for authentication' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class FilterUserDto
  extends PartialType(OmitType(CreateUserDto, ['password']))
  implements IUsersFilters {}

export class QueryUserDto
  extends BaseQueryDto<FilterUserDto>
  implements IQueryDto<FilterUserDto> {}
