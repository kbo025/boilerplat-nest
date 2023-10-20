import {
  Controller,
  Delete,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RbacLinkDto, RbacAssigmentDto } from '../dtos/rbac.dto';
import { RbacService } from '../services/rbac.service';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('rbac')
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

  @Post('user/:email/role/:slug')
  @HttpCode(HttpStatus.CREATED)
  async assingRoleToUser(@Query() dto: RbacAssigmentDto): Promise<boolean> {
    const response = await this.rbacService.assingRoleToUser(dto);
    return response;
  }

  @Delete('user/:email/role/:slug')
  @HttpCode(HttpStatus.CREATED)
  async revokeRoleToUser(@Query() dto: RbacAssigmentDto): Promise<boolean> {
    const response = await this.rbacService.revokeRoleToUser(dto);
    return response;
  }

  @Post('user/:email/permission/:slug')
  @HttpCode(HttpStatus.CREATED)
  async assingPermissionToUser(
    @Query() dto: RbacAssigmentDto,
  ): Promise<boolean> {
    const response = await this.rbacService.assingPermissionToUser(dto);
    return response;
  }

  @Delete('user/:email/permission/:slug')
  @HttpCode(HttpStatus.CREATED)
  async revokePermissionToUser(
    @Query() dto: RbacAssigmentDto,
  ): Promise<boolean> {
    const response = await this.rbacService.revokePermissionToUser(dto);
    return response;
  }

  @Post('role/:parent/permission/:child')
  @HttpCode(HttpStatus.CREATED)
  async assingPermissionToRole(@Query() dto: RbacLinkDto): Promise<boolean> {
    const response = await this.rbacService.assingPermissionToRole(dto);
    return response;
  }

  @Delete('role/:parent/permission/:child')
  @HttpCode(HttpStatus.CREATED)
  async revokePermissionToRole(@Query() dto: RbacLinkDto): Promise<boolean> {
    const response = await this.rbacService.revokePermissionToRole(dto);
    return response;
  }
}
