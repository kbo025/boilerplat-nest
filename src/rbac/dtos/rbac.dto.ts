import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRbacDto {
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
  readonly parent: string;
}

export class UpdateRbacDto extends PartialType(CreateRbacDto) {}
