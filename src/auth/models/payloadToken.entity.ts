import { IUserEntity } from 'src/user/entities/user.entity';

export type PayloadToken = {
  sub: string | number;
  email: string;
};

export type AccessTokenInf = {
  access_token: string;
  user: IUserEntity;
};
