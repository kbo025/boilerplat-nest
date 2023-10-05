import { IBaseRbacEntity } from './base.entity';

export interface ILinkRbacEntity {
  parent: IBaseRbacEntity;
  child: IBaseRbacEntity;
}
