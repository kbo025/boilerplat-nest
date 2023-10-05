import { Injectable, Inject } from '@nestjs/common';
import {
  CreateUserDto,
  FilterUserDto,
  QueryUserDto,
  UserDto,
} from '../dtos/user.dto';
import { UpdateUserDto } from '../dtos/user.dto';
import {
  IPaginatorService,
  QueryResponse,
} from 'src/common/types/paginator/paginator.type';
import { IUserEntity } from '../entities/user.entity';
import { IUserRepository } from '../contracts/IUser.repository';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService
  implements IPaginatorService<IUserEntity, FilterUserDto>
{
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const response = await this.userRepository.createUser(dto);
    const user = plainToClass(UserDto, response, {
      excludeExtraneousValues: true,
    });

    return user;
  }

  async list(
    dto: QueryUserDto,
  ): Promise<QueryResponse<UserDto, FilterUserDto> | QueryResponse<UserDto>> {
    const response = await this.userRepository.findAllUsers(dto);
    response.data = response.data.map((obj) =>
      plainToClass(UserDto, obj, {
        excludeExtraneousValues: true,
      }),
    );
    return response;
  }

  async getUser(id: number | string): Promise<UserDto> {
    const response = await this.userRepository.findUser(id);
    const user = plainToClass(UserDto, response, {
      excludeExtraneousValues: true,
    });
    return user;
  }

  async findByEmail(email: string): Promise<UserDto> {
    const response = await this.userRepository.findByEmail(email);
    const user = plainToClass(UserDto, response, {
      excludeExtraneousValues: true,
    });
    return user;
  }

  async updateUser(id: number | string, dto: UpdateUserDto): Promise<UserDto> {
    const response = await this.userRepository.updateUser(id, dto);
    const user = plainToClass(UserDto, response, {
      excludeExtraneousValues: true,
    });
    return user;
  }

  async deleteUser(id: number | string): Promise<boolean> {
    const response = await this.userRepository.deleteUser(id);
    return response;
  }
}
