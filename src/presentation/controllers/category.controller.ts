// import {
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
//   Query,
//   Body,
//   ParseIntPipe,
//   HttpCode,
//   HttpStatus,
// } from '@nestjs/common';
// import {
//   CategoryDto,
//   CreateCategoryDto,
//   UpdateCategoryDto,
// } from '../dtos/category.dto';
// import { CategoriesService } from '../services/categories.service';

import { Controller } from '@nestjs/common';

@Controller('c')
export class CategoryController {
  // constructor(private readonly categoryService: CategoriesService) {}
  // @Post(':slug')
  // @HttpCode(HttpStatus.CREATED)
  // async create(
  //   @Param('slug') slug: string,
  //   @Body() dto: CreateCategoryDto,
  // ): Promise<CategoryDto> {
  //   // return await this.categoryService.create(slug, dto);
  // }
  // @Get(':slug')
  // @HttpCode(HttpStatus.CREATED)
  // async list(
  //   @Param('slug') slug: string,
  //   @Query('page', ParseIntPipe) page = 1,
  //   @Query('itemsPerPage', ParseIntPipe) itemsPerPage = 100,
  //   @Query('filters') filters: object,
  // ): Promise<CategoryDto[]> {
  //   return await this.categoryService.list(slug, page, itemsPerPage, filters);
  // }
  // @Get(':slug/:id')
  // async get(
  //   @Param('slug') slug: string,
  //   @Param('id', ParseIntPipe) id: number,
  //   @Query('deep', ParseIntPipe) deep = 0,
  // ): Promise<CategoryDto> {
  //   return await this.categoryService.get(slug, id, deep);
  // }
  // @Patch(':slug/:id')
  // @HttpCode(HttpStatus.CREATED)
  // async update(
  //   @Param('slug') slug: string,
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() dto: UpdateCategoryDto,
  // ): Promise<CategoryDto> {
  //   return await this.categoryService.update(slug, id, dto);
  // }
  // @Delete(':slug/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async delete(
  //   @Param('slug') slug: string,
  //   @Param('id', ParseIntPipe) id: number,
  // ): Promise<void> {
  //   return await this.categoryService.delete(slug, id);
  // }
}
