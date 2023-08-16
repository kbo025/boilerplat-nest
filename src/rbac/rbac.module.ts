import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';
import { RbacService } from './services/rbac.service';

@Module({
  controllers: [RoleController, PermissionController],
  providers: [RbacService],
})
export class RbacModule {}
