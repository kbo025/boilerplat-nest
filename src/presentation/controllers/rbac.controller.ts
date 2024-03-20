import {
  Controller,
  Delete,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
// import {
//   CreateRbacLinkDto,
//   RbacAssigmentDto,
//   CreateRbacAssigmentDto,
//   RbacLinkDto,
// } from '../dtos/rbac.dto';
// import { RbacService } from '../services/rbac.service';
import { ApiKeyGuard } from 'src/infra/auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('rbac')
export class RbacController {
  // constructor(private readonly rbacService: RbacService) {}
  // @Get('user/:email')
  // @HttpCode(HttpStatus.CREATED)
  // async getAssigments(
  //   @Query() email: string,
  // ): Promise<[RbacAssigmentDto[], number]> {
  //   return await this.rbacService.getAssigmentsByUser(email);
  // }
  // @Post('user/:email/role/:slug')
  // @HttpCode(HttpStatus.CREATED)
  // async assingRoleToUser(
  //   @Query() dto: CreateRbacAssigmentDto,
  // ): Promise<boolean> {
  //   return await this.rbacService.assingRoleToUser(dto);
  // }
  // @Delete('user/:email/role/:slug')
  // @HttpCode(HttpStatus.CREATED)
  // async revokeRoleToUser(
  //   @Query() dto: CreateRbacAssigmentDto,
  // ): Promise<boolean> {
  //   return await this.rbacService.revokeRoleToUser(dto);
  // }
  // @Post('user/:email/permission/:slug')
  // @HttpCode(HttpStatus.CREATED)
  // async assingPermissionToUser(
  //   @Query() dto: CreateRbacAssigmentDto,
  // ): Promise<boolean> {
  //   return await this.rbacService.assingPermissionToUser(dto);
  // }
  // @Delete('user/:email/permission/:slug')
  // @HttpCode(HttpStatus.CREATED)
  // async revokePermissionToUser(
  //   @Query() dto: CreateRbacAssigmentDto,
  // ): Promise<boolean> {
  //   return await this.rbacService.revokePermissionToUser(dto);
  // }
  // @Get('role/:slug')
  // @HttpCode(HttpStatus.CREATED)
  // async getLinks(
  //   @Query('slug') slug: string,
  // ): Promise<[RbacLinkDto[], number]> {
  //   return await this.rbacService.getLinksByRole(slug);
  // }
  // @Post('role/:parent/permission/:child')
  // @HttpCode(HttpStatus.CREATED)
  // async assingPermissionToRole(
  //   @Query() dto: CreateRbacLinkDto,
  // ): Promise<boolean> {
  //   return await this.rbacService.assingPermissionToRole(dto);
  // }
  // @Delete('role/:parent/permission/:child')
  // @HttpCode(HttpStatus.CREATED)
  // async revokePermissionToRole(
  //   @Query() dto: CreateRbacLinkDto,
  // ): Promise<boolean> {
  //   return await this.rbacService.revokePermissionToRole(dto);
  // }
}
