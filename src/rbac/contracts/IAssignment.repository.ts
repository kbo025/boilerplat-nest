import { IUserEntity } from 'src/user/entities/user.entity';
import { RbacDto } from '../dtos/rbac.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { IAssigmentRbacEntity } from '../entities/assignment.entity';

export interface IAssignmentRepository {
  assing(user: UserDto, child: RbacDto): Promise<boolean>;
  revoke(user: UserDto, child: RbacDto): Promise<boolean>;
  findByUser(user: IUserEntity): Promise<[IAssigmentRbacEntity[], number]>;
}

export const IAssignmentRepository = Symbol('IAssignmentRepository');
