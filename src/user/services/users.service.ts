import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto, QueryUserDto } from '../dtos/user.dto';
import { UpdateUserDto } from '../dtos/user.dto';
import { Client } from 'pg';
import { IQueryResponse } from 'src/common/types/paginator/paginator.type';
import { IUserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  async createUser(dto: CreateUserDto) {
    // TODO: create statement with pg
    throw new Error('Method not implemented.');
  }

  async listUsers(dto: QueryUserDto): Promise<IQueryResponse<IUserEntity>> {
    console.log(dto);
    throw new Error('Method not implemented.');
  }

  async getUser(id: number) {
    throw new Error('Method not implemented.');
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }

  async deleteUser(id: number) {
    throw new Error('Method not implemented.');
  }
}
