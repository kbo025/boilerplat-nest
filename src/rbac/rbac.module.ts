import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';

@Module({
  controllers: [RoleController, PermissionController],
})
export class RbacModule {}
