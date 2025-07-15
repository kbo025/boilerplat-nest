export interface IUserEntity {
  id: number;
  email: string;
  name: string;
  password: string;
}

export type IUsersFilters = Partial<Omit<IUserEntity, 'id' | 'password'>>;
