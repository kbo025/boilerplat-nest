import { IBaseRbacEntity } from './base.entity';
import { IPermissionEntity } from './permission.entity';

export interface IRoleEntity extends IBaseRbacEntity {
  readonly type: 1;
  id: number;
  name: string;
  description: string;
  slug: string;

  parent: null;
  children: IPermissionEntity[] | null;
}
