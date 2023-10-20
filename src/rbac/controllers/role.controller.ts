import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  // UseGuards,
} from '@nestjs/common';
import {
  CreateRbacDto,
  FilterRbacDto,
  QueryRbacDto,
  RbacDto,
  UpdateRbacDto,
} from '../dtos/rbac.dto';
import { RbacService } from '../services/rbac.service';
// import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { QueryResponse } from 'src/common/types/paginator/paginator.type';

// @UseGuards(ApiKeyGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly rbacService: RbacService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateRbacDto): Promise<RbacDto> {
    const response = await this.rbacService.createRole(dto);
    return response;
  }

  @Get()
  async list(
    @Query() params: QueryRbacDto,
  ): Promise<QueryResponse<RbacDto, FilterRbacDto> | QueryResponse<RbacDto>> {
    const response = await this.rbacService.listRoles(params);
    return response;
  }

  @Get('/:slug')
  async get(@Param('slug') slug: string): Promise<RbacDto> {
    const response = await this.rbacService.getRole(slug);
    return response;
  }

  @Patch('/:slug')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('slug') slug: string,
    @Body() dto: UpdateRbacDto,
  ): Promise<RbacDto> {
    const response = await this.rbacService.updateRole(slug, dto);
    return response;
  }

  @Delete('/:slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('slug') slug: string): Promise<boolean> {
    const response = await this.rbacService.deleteRole(slug);
    return response;
  }
}
