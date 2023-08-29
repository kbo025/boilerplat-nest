import { Column, Entity, OneToMany } from 'typeorm';
import { IUserEntity } from 'src/user/entities/user.entity';
import { BasePgEntity } from '../basePg.entity';
import { IUserRbacEntity } from 'src/rbac/entities/user.entity';
import { AssignmentPgEntity } from '../rbac/assigmentPg.entity';

@Entity({ name: 'users' })
export class UserPgEntity
  extends BasePgEntity
  implements IUserEntity, IUserRbacEntity
{
  @Column({
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  hashPassword: string;

  @OneToMany(() => AssignmentPgEntity, (ass) => ass.permission)
  assignments: AssignmentPgEntity[];
}
