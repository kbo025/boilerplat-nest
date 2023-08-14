import { BaseRbacEntity } from './base.entity';

export class PermissionEntity extends BaseRbacEntity {
  protected static type = 2;

  childs: PermissionEntity[];
}
