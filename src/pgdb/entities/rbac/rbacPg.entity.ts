import { IBaseRbacEntity } from 'src/rbac/entities/base.entity';
import { BasePgEntity } from '../basePg.entity';
import { Column, Entity, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => RbacPgEntity, (parent) => parent.children)
  @JoinColumn({ name: 'parent_id' })
  parent: RbacPgEntity | null;

  @OneToMany(() => RbacPgEntity, (child) => child.parent)
  children: RbacPgEntity[] | null;
}
