import { IBaseRbacEntity } from './base.entity';
import { IUserRbacEntity } from './user.entity';

export interface IAssigmentRbacEntity {
  permission: IBaseRbacEntity;
  user: IUserRbacEntity;
}
