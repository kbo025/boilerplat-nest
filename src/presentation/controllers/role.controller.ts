import {
  Controller,
  // Delete,
  // Get,
  // Param,
  // Patch,
  // Post,
  // Query,
  // Body,
  // HttpCode,
  // HttpStatus,
  // UseGuards,
} from '@nestjs/common';
// import {
//   CreateRbacDto,
//   FilterRbacDto,
//   QueryRbacDto,
//   RbacDto,
//   UpdateRbacDto,
// } from '../dtos/rbac.dto';
// import { RbacService } from '../services/rbac.service';
// // import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
// import { QueryResponse } from 'src/common/types/paginator/paginator.type';
// import { TypeRbac } from 'src/rbac/entities/base.entity';

// @UseGuards(ApiKeyGuard)
@Controller('roles')
export class RoleController {
  // constructor(private readonly rbacService: RbacService) {}
  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // async create(@Body() dto: CreateRbacDto): Promise<RbacDto> {
  //   return await this.rbacService.create(TypeRbac.ROLE, dto);
  // }
  // @Get()
  // async list(
  //   @Query() params: QueryRbacDto,
  // ): Promise<QueryResponse<RbacDto, FilterRbacDto> | QueryResponse<RbacDto>> {
  //   return await this.rbacService.list(TypeRbac.ROLE, params);
  // }
  // @Get('/:slug')
  // async get(@Param('slug') slug: string): Promise<RbacDto> {
  //   return await this.rbacService.get(TypeRbac.ROLE, slug);
  // }
  // @Patch('/:slug')
  // @HttpCode(HttpStatus.CREATED)
  // async update(
  //   @Param('slug') slug: string,
  //   @Body() dto: UpdateRbacDto,
  // ): Promise<RbacDto> {
  //   return await this.rbacService.update(TypeRbac.ROLE, slug, dto);
  // }
  // @Delete('/:slug')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async delete(@Param('slug') slug: string): Promise<void> {
  //   return await this.rbacService.delete(TypeRbac.ROLE, slug);
  // }
}
