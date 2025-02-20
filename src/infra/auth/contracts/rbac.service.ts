import { IUserEntity } from 'src/domain/entities/IUser.entity';

export interface IAuthRbacService {
  saveAllRoles(roles: string[]): Promise<boolean>;
  saveAllPermissions(permissions: string[]): Promise<boolean>;
  is(user: IUserEntity, slug: string): Promise<boolean>;
  can(user: IUserEntity, slug: string): Promise<boolean>;
  getAllByUser(
    user: IUserEntity,
  ): Promise<{ roles: any[]; permissions: any[] }>;
}

export const IAuthRbacService = Symbol('IAuthRbacService');
