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

@Controller('c')
export class CategoryController {
  @Post(':slug')
  @HttpCode(HttpStatus.CREATED)
  create(@Param('slug') slug: string, @Body() dto: CreateCategoryDto) {
    return {
      slug,
      dto,
    };
  }

  @Get(':slug')
  @HttpCode(HttpStatus.CREATED)
  list(
    @Param('slug') slug: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage = 100,
    @Query('filters') filters: object,
  ) {
    return {
      slug,
      page,
      itemsPerPage,
      filters,
    };
  }

  @Get(':slug/:id')
  get(@Param('slug') slug: string, @Param('id', ParseIntPipe) id: number) {
    return {
      id,
      slug,
    };
  }

  @Patch(':slug/:id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return {
      id,
      slug,
      dto,
    };
  }

  @Delete(':slug/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('slug') slug: string, @Param('id', ParseIntPipe) id: number) {
    return {
      id,
      slug,
    };
  }
}
