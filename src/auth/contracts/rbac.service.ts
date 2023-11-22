import { IPermissionEntity } from 'src/rbac/entities/permission.entity';
import { IRoleEntity } from 'src/rbac/entities/role.entity';
import { IUserEntity } from 'src/user/entities/user.entity';

export interface IAuthRbacService {
  saveAllRoles(roles: string[]): Promise<boolean>;
  saveAllPermissions(permissions: string[]): Promise<boolean>;
  is(user: IUserEntity, slug: string): Promise<boolean>;
  can(user: IUserEntity, slug: string): Promise<boolean>;
  getAllByUser(
    user: IUserEntity,
  ): Promise<{ roles: IRoleEntity[]; permissions: IPermissionEntity[] }>;
}

export const IAuthRbacService = Symbol('IAuthRbacService');
