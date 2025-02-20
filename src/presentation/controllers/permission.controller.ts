import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
// import {
//   CreateRbacDto,
//   FilterRbacDto,
//   QueryRbacDto,
//   RbacDto,
//   UpdateRbacDto,
// } from '../dtos/rbac.dto';
// import { RbacService } from '../services/rbac.service';
import { ApiKeyGuard } from 'src/infra/auth/guards/api-key.guard';
// import { QueryResponse } from 'src/common/types/paginator/paginator.type';
// import { TypeRbac } from 'src/rbac/entities/base.entity';

@UseGuards(ApiKeyGuard)
@Controller('rbac/permissions')
export class PermissionController {
  // constructor(private readonly rbacService: RbacService) {}
  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // async create(@Body() dto: CreateRbacDto): Promise<RbacDto> {
  //   return await this.rbacService.create(TypeRbac.PERMISSION, dto);
  // }
  // @Get()
  // async list(
  //   @Query() params: QueryRbacDto,
  // ): Promise<QueryResponse<RbacDto, FilterRbacDto> | QueryResponse<RbacDto>> {
  //   return await this.rbacService.list(TypeRbac.PERMISSION, params);
  // }
  // @Get('/:slug')
  // async get(@Param('slug') slug: string): Promise<RbacDto> {
  //   return await this.rbacService.get(TypeRbac.PERMISSION, slug);
  // }
  // @Patch('/:slug')
  // @HttpCode(HttpStatus.CREATED)
  // async update(
  //   @Param('slug') slug: string,
  //   @Body() dto: UpdateRbacDto,
  // ): Promise<RbacDto> {
  //   return await this.rbacService.update(TypeRbac.PERMISSION, slug, dto);
  // }
  // @Delete('/:slug')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async delete(@Param('slug') slug: string): Promise<void> {
  //   return await this.rbacService.delete(TypeRbac.PERMISSION, slug);
  // }
}
