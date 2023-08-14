import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRbacDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly parent: string;
}

export class UpdateRbacDto extends PartialType(CreateRbacDto) {}
