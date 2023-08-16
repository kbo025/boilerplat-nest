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
import { RbacService } from '../services/rbac.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly rbacService: RbacService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateRbacDto) {
    const response = await this.rbacService.createPermission(dto);
    return response;
  }

  @Get()
  async list(
    @Query('page', ParseIntPipe) page = 1,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage = 100,
    @Query('filters') filters: object,
  ) {
    const response = await this.rbacService.listPermissions(
      page,
      itemsPerPage,
      filters,
    );
    return response;
  }

  @Get('/:slug')
  async get(@Param('slug') slug: string) {
    const response = await this.rbacService.getPermission(slug);
    return response;
  }

  @Patch('/:slug')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('slug') slug: string, @Body() dto: UpdateRbacDto) {
    const response = await this.rbacService.updatePermission(slug, dto);
    return response;
  }

  @Delete('/:slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('slug') slug: string) {
    const response = await this.rbacService.deletePermission(slug);
    return response;
  }
}
