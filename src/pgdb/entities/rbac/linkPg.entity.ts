import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BasePgEntity } from '../basePg.entity';
import { RbacPgEntity } from './rbacPg.entity';
import { ILinkRbacEntity } from 'src/rbac/entities/link.entity';

@Entity({ name: 'rbac-links' })
export class LinkPgEntity extends BasePgEntity implements ILinkRbacEntity {
  @ManyToOne(() => RbacPgEntity)
  @JoinColumn({ name: 'parent_id' })
  parent: RbacPgEntity;

  @ManyToOne(() => RbacPgEntity)
  @JoinColumn({ name: 'child_id' })
  child: RbacPgEntity;
}
