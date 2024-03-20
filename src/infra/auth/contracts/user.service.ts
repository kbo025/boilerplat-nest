import { IUserEntity } from 'src/domain/entities/IUser.entity';

export interface IAuthUserService {
  findByEmail(email: string): Promise<IUserEntity>;
}

export const IAuthUserService = Symbol('IAuthUserService');
