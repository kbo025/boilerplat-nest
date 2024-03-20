// import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
// import { Exclude, Expose } from 'class-transformer';
// import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

// @Exclude()
// export class CategoryDto {
//   @Expose()
//   @ApiProperty({ description: 'Description of category' })
//   @IsOptional()
//   @IsString()
//   slug: string;

//   @Expose()
//   @ApiProperty({ description: 'Name of category' })
//   @IsNotEmpty()
//   @IsString()
//   name: string;

//   @Expose()
//   @ApiProperty({ description: 'Description of category' })
//   @IsOptional()
//   @IsString()
//   description: string;

//   @Expose()
//   @ApiProperty({ description: 'Order in the returned list' })
//   @IsInt()
//   @Min(0)
//   @IsOptional()
//   order = 0;
// }

// export class CreateCategoryDto extends OmitType(CategoryDto, ['slug']) {}
// export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
