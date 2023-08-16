import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { UpdateUserDto } from '../dtos/user.dto';
import { Client } from 'pg';

@Injectable()
export class UsersService {
  constructor(@Inject('PG') private clientPg: Client) {}

  createUser(dto: CreateUserDto) {
    // TODO: create statement with pg
    throw new Error('Method not implemented.');
  }
  listUsers(page: number, itemsPerPage: number, filters: object) {
    throw new Error('Method not implemented.');
  }
  getUser(id: number) {
    throw new Error('Method not implemented.');
  }
  updateUser(id: number, dto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: number) {
    throw new Error('Method not implemented.');
  }
}
