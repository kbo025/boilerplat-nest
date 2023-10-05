import { IBaseRbacEntity } from './base.entity';

export interface IRoleEntity extends IBaseRbacEntity {
  readonly type: 1;
  id: number;
  name: string;
  description: string;
  slug: string;

  parent: null | IRoleEntity;
  children: IBaseRbacEntity[] | null;
}
