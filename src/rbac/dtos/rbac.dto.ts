import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseQueryDto } from 'src/common/types/paginator/baseQuery.dto';
import { IQueryDto } from 'src/common/types/paginator/paginator.type';

export class RbacDto {
  @ApiProperty({ description: 'Name of role/permission' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Description of role/permission' })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'Parent of role/permission' })
  @IsString()
  @IsOptional()
  readonly slug: string;
}

export class CreateRbacDto extends PartialType(OmitType(RbacDto, ['slug'])) {}
export class UpdateRbacDto extends PartialType(CreateRbacDto) {}
export class RbacRelationsDto {
  @ApiProperty({ description: 'Parent slug' })
  @IsString()
  @IsNotEmpty()
  parent: string;

  @ApiProperty({ description: 'children array slugs' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  children: string[];
}
export class FilterRbacDto {
  @ApiProperty({ description: 'Parent of role/permission' })
  @IsString()
  @IsOptional()
  readonly slug: string;
}

export class QueryRbacDto
  extends BaseQueryDto<FilterRbacDto>
  implements IQueryDto<FilterRbacDto> {}
