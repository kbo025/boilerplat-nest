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
import { CreateRbacDto, UpdateRbacDto } from '../dtos/rbac.dto';
import { RbacService } from '../services/rbac.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly rbacService: RbacService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateRbacDto) {
    const response = await this.rbacService.createRole(dto);
    return response;
  }

  @Get()
  async list(
    @Query('page', ParseIntPipe) page = 1,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage = 100,
    @Query('filters') filters: object,
  ) {
    const response = await this.rbacService.listRoles(
      page,
      itemsPerPage,
      filters,
    );
    return response;
  }

  @Get('/:slug')
  async get(@Param('slug') slug: string) {
    const response = await this.rbacService.getRole(slug);
    return response;
  }

  @Patch('/:slug')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('slug') slug: string, @Body() dto: UpdateRbacDto) {
    const response = await this.rbacService.updateRole(slug, dto);
    return response;
  }

  @Delete('/:slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('slug') slug: string) {
    const response = await this.rbacService.deleteRole(slug);
    return response;
  }
}
