import { IUserEntity, IUsersFilters } from '../entities/IUser.entity';
import { IQueryDto, QueryResponse } from '../common/paginator/paginator.type';

export interface IUserRepository {
  createUser(data: Partial<IUserEntity>): Promise<IUserEntity>;
  updateUser(
    id: number | string,
    data: Partial<IUserEntity>,
  ): Promise<IUserEntity>;
  findUser(id: number | string): Promise<IUserEntity>;
  findAllUsers(
    dto: IQueryDto<IUsersFilters>,
  ): Promise<
    QueryResponse<IUserEntity, IUsersFilters> | QueryResponse<IUserEntity>
  >;
  deleteUser(id: number | string): Promise<boolean>;
}
