import { IAssigmentRbacEntity } from './assignment.entity';
export interface IUserRbacEntity {
  id: number;
  assignments: IAssigmentRbacEntity[];
}
