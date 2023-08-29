import { IBaseRbacEntity } from './base.entity';

export interface IPermissionEntity extends IBaseRbacEntity {
  readonly type: 2;
  id: number;
  name: string;
  description: string;
  slug: string;

  parent: IBaseRbacEntity;
  children: null;
}
