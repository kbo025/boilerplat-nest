import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BasePgEntity } from '../basePg.entity';
import { IAssigmentRbacEntity } from 'src/rbac/entities/assignment.entity';
import { UserPgEntity } from '../user/userPg.entity';
import { RbacPgEntity } from './rbacPg.entity';

@Entity({ name: 'rbac-assigments' })
export class AssignmentPgEntity
  extends BasePgEntity
  implements IAssigmentRbacEntity
{
  @ManyToOne(() => RbacPgEntity)
  @JoinColumn({ name: 'rbac_id' })
  permission: RbacPgEntity;

  @ManyToOne(() => UserPgEntity, (user) => user.assignments)
  @JoinColumn({ name: 'user_id' })
  user: UserPgEntity;
}
