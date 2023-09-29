import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto, FilterUserDto, QueryUserDto } from '../dtos/user.dto';
import { UpdateUserDto } from '../dtos/user.dto';
import {
  IPaginatorService,
  QueryResponse,
} from 'src/common/types/paginator/paginator.type';
import { IUserEntity } from '../entities/user.entity';
import { IUserRepository } from '../contracts/IUser.repository';

@Injectable()
export class UsersService
  implements IPaginatorService<IUserEntity, FilterUserDto>
{
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async createUser(dto: CreateUserDto) {
    const response = await this.userRepository.createUser(dto);
    return response;
  }

  async list(
    dto: QueryUserDto,
  ): Promise<
    QueryResponse<IUserEntity, FilterUserDto> | QueryResponse<IUserEntity>
  > {
    const response = await this.userRepository.findAllUsers(dto);
    return response;
  }

  async getUser(id: number | string) {
    const response = await this.userRepository.findUser(id);
    return response;
  }

  async findByEmail(email: string) {
    const response = await this.userRepository.findByEmail(email);
    return response;
  }

  async updateUser(id: number | string, dto: UpdateUserDto) {
    const response = await this.userRepository.updateUser(id, dto);
    return response;
  }

  async deleteUser(id: number | string) {
    const response = await this.userRepository.deleteUser(id);
    return response;
  }
}
