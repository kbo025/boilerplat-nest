import { IBaseRbacEntity } from 'src/rbac/entities/base.entity';
import { BasePgEntity } from '../basePg.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'rbac-roles-permissions' })
export class RbacPgEntity extends BasePgEntity implements IBaseRbacEntity {
  @Column({ type: 'int' })
  readonly type: 1 | 2;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  description: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  slug: string;
}
