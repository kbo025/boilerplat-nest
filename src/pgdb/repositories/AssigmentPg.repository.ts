import { IAssignmentRepository } from 'src/rbac/contracts/IAssignment.repository';

import { RbacPgEntity } from '../entities/rbac/rbacPg.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignmentPgEntity } from '../entities/rbac/assigmentPg.entity';
import { UserPgEntity } from '../entities/user/userPg.entity';

export class AssigmentPgRepository implements IAssignmentRepository {
  constructor(
    @InjectRepository(AssignmentPgEntity)
    private readonly assignmentRep: Repository<AssignmentPgEntity>,
  ) {}

  async assing(user: UserPgEntity, permission: RbacPgEntity): Promise<boolean> {
    const response = await this.assignmentRep.save({ user, permission });
    console.log(response);

    return true;
  }

  async revoke(user: UserPgEntity, permission: RbacPgEntity): Promise<boolean> {
    const response = await this.assignmentRep.delete({
      user,
      permission,
    });
    console.log(response);

    return true;
  }
}
