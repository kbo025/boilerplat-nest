import {
  IQueryDto,
  QueryResponse,
} from 'src/common/types/paginator/paginator.type';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from '../dtos/user.dto';
import { IUserEntity } from '../entities/user.entity';

export interface IUserRepository {
  createUser(data: CreateUserDto): Promise<IUserEntity>;
  saveUser(data: UpdateUserDto): Promise<IUserEntity>;
  updateUser(id: number | string, data: UpdateUserDto): Promise<IUserEntity>;
  findUser(id: number | string): Promise<IUserEntity>;
  findByEmail(email: string): Promise<IUserEntity>;
  findAllUsers(
    dto: IQueryDto<FilterUserDto>,
  ): Promise<
    QueryResponse<IUserEntity, FilterUserDto> | QueryResponse<IUserEntity>
  >;
  deleteUser(id: number | string): Promise<boolean>;
}

export const IUserRepository = Symbol('IUserRepository');
