import { RbacDto } from '../dtos/rbac.dto';
import { UserDto } from 'src/user/dtos/user.dto';

export interface IAssignmentRepository {
  assing(user: UserDto, child: RbacDto): Promise<boolean>;
  revoke(user: UserDto, child: RbacDto): Promise<boolean>;
}

export const IAssignmentRepository = Symbol('IAssignmentRepository');
