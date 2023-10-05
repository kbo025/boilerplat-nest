import {
  Controller,
  Delete,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RbacRelationsDto } from '../dtos/rbac.dto';
import { RbacService } from '../services/rbac.service';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('rbac')
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async assing(@Body() dto: RbacRelationsDto): Promise<boolean> {
    const response = await this.rbacService.assing(dto);
    return response;
  }

  @Delete()
  @HttpCode(HttpStatus.CREATED)
  async revoke(@Body() dto: RbacRelationsDto): Promise<boolean> {
    const response = await this.rbacService.revoke(dto);
    return response;
  }
}
