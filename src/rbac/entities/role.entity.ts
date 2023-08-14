import { BaseRbacEntity } from './base.entity';
import { PermissionEntity } from './permission.entity';

export class RoleEntity extends BaseRbacEntity {
  protected static type = 1;

  childs: RoleEntity[];
  permissions: PermissionEntity[];
}
