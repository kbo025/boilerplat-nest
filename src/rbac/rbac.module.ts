import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';
import { RbacService } from './services/rbac.service';
import { PgdbModule } from 'src/pgdb/pgdb.module';
import { IRbacRepository } from './contracts/IRbac.repository';
import { RbacPgRepository } from 'src/pgdb/repositories/RbacPg.repository';
import { RbacController } from './controllers/rbac.controller';

@Module({
  imports: [PgdbModule],
  controllers: [RoleController, PermissionController, RbacController],
  providers: [
    RbacService,
    { provide: IRbacRepository, useClass: RbacPgRepository },
  ],
})
export class RbacModule {}
