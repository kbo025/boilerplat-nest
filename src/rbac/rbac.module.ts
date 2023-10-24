import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';
import { RbacService } from './services/rbac.service';
import { PgdbModule } from 'src/pgdb/pgdb.module';
import { IRbacRepository } from './contracts/IRbac.repository';
import { RbacPgRepository } from 'src/pgdb/repositories/RbacPg.repository';
import { RbacController } from './controllers/rbac.controller';
import { ILinkRepository } from './contracts/ILink.repository';
import { LinkPgRepository } from 'src/pgdb/repositories/LinkPg.repository';
import { IAssignmentRepository } from './contracts/IAssignment.repository';
import { AssigmentPgRepository } from 'src/pgdb/repositories/AssigmentPg.repository';
import { IUserRepository } from 'src/user/contracts/IUser.repository';
import { UserPgRepository } from 'src/pgdb/repositories/UserPg.repository';

@Module({
  imports: [PgdbModule],
  controllers: [RoleController, PermissionController, RbacController],
  providers: [
    RbacService,
    { provide: IRbacRepository, useClass: RbacPgRepository },
    { provide: ILinkRepository, useClass: LinkPgRepository },
    { provide: IAssignmentRepository, useClass: AssigmentPgRepository },
    { provide: IUserRepository, useClass: UserPgRepository },
  ],
})
export class RbacModule {}
