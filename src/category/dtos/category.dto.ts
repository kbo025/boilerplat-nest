import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  readonly order: number = 0;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
