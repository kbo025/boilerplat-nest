import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { CategoryService } from '../services/category.service';

@Controller('c')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post(':slug')
  @HttpCode(HttpStatus.CREATED)
  async create(@Param('slug') slug: string, @Body() dto: CreateCategoryDto) {
    const response = await this.categoryService.create(slug, dto);
    return response;
  }

  @Get(':slug')
  @HttpCode(HttpStatus.CREATED)
  async list(
    @Param('slug') slug: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage = 100,
    @Query('filters') filters: object,
  ) {
    const response = await this.categoryService.list(
      slug,
      page,
      itemsPerPage,
      filters,
    );
    return response;
  }

  @Get(':slug/:id')
  async get(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
    @Query('deep', ParseIntPipe) deep = 0,
  ) {
    const response = await this.categoryService.get(slug, id, deep);
    return response;
  }

  @Patch(':slug/:id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    const response = await this.categoryService.update(slug, id, dto);
    return response;
  }

  @Delete(':slug/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const response = await this.categoryService.delete(slug, id);
    return response;
  }
}
