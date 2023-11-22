import { IBaseRbacEntity, TypeRbac } from 'src/rbac/entities/base.entity';
import { BasePgEntity } from '../basePg.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity({ name: 'rbac-roles-permissions' })
@Unique('unique_slug', ['slug', 'type'])
export class RbacPgEntity extends BasePgEntity implements IBaseRbacEntity {
  @Column({ type: 'int' })
  readonly type: TypeRbac;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  description: string;

  @Column({ type: 'varchar', length: 256 })
  slug: string;
}
