import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateRbacDto, UpdateRbacDto } from '../dtos/rbac.dto';

@Controller('permissions')
export class PermissionController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateRbacDto) {
    return { dto };
  }

  @Get()
  list(
    @Query('page', ParseIntPipe) page = 1,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage = 100,
    @Query('filters') filters: object,
  ) {
    return { page, itemsPerPage, filters };
  }

  @Get('/:slug')
  get(@Param('slug') slug: string) {
    return { slug };
  }

  @Patch('/:slug')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('slug') slug: string, @Body() dto: UpdateRbacDto) {
    return { slug, dto };
  }

  @Delete('/:slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('slug') slug: string) {
    return { slug };
  }
}
