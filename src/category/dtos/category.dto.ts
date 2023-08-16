import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Name of category' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Description of category' })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'Order in the returned list' })
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly order: number = 0;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
