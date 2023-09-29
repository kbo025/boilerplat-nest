import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/common/types/paginator/baseQuery.dto';
import { IQueryDto } from 'src/common/types/paginator/paginator.type';

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
export class FilterUserDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {}

export class QueryUserDto
  extends BaseQueryDto<FilterUserDto>
  implements IQueryDto<FilterUserDto> {}
