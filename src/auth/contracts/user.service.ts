import { IUserEntity } from 'src/user/entities/user.entity';

export interface IAuthUserService {
  findByEmail(email: string): Promise<IUserEntity>;
}

export const IAuthUserService = Symbol('IAuthUserService');
