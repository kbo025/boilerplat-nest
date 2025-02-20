import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, FilterUserDto, UserDto } from '../dtos/user.dto';
import { QueryUserDto } from '../dtos/user.dto';
import { UpdateUserDto } from '../dtos/user.dto';
import { QueryResponse } from 'src/domain/common/paginator/paginator.type';
import { UserPrismaRepository } from 'src/infra/prisma/repositories/UserPrisma.repository';
import { CreateUserUseCase } from 'src/domain/useCases/users/CreateUser.usecase';
import { UpdateUserUseCase } from 'src/domain/useCases/users/UpdateUser.usecase';
import { DeleteUserUseCase } from 'src/domain/useCases/users/DeleteUser.usecase';
import { GetUserUseCase } from 'src/domain/useCases/users/GetUser.usecase';
import { ListUsersUseCase } from 'src/domain/useCases/users/ListUsers.usecase';
import { hashSync } from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserPrismaRepository)
    private readonly userRepository: UserPrismaRepository,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const { name, email, password } = dto;
    const useCase = new CreateUserUseCase(this.userRepository);
    const response = await useCase.execute({
      name,
      email,
      password: hashSync(password, 10),
    });

    return plainToClass(UserDto, response, {
      excludeExtraneousValues: true,
    });
  }

  async list(
    params: QueryUserDto,
  ): Promise<QueryResponse<UserDto, FilterUserDto> | QueryResponse<UserDto>> {
    const useCase = new ListUsersUseCase(this.userRepository);
    const response = await useCase.execute(params);
    response.data = response.data.map((e) =>
      plainToClass(UserDto, e, {
        excludeExtraneousValues: true,
      }),
    );
    return response;
  }

  async getUser(id: number): Promise<UserDto> {
    const useCase = new GetUserUseCase(this.userRepository);
    const response = await useCase.execute({ id });
    return plainToClass(UserDto, response, {
      excludeExtraneousValues: true,
    });
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<UserDto> {
    const { name, password, email } = dto;
    const useCase = new UpdateUserUseCase(this.userRepository);
    const response = await useCase.execute({
      id,
      name,
      password: password ? hashSync(password, 10) : undefined,
      email,
    });
    return plainToClass(UserDto, response, {
      excludeExtraneousValues: true,
    });
  }

  async deleteUser(id: number): Promise<any> {
    const useCase = new DeleteUserUseCase(this.userRepository);
    await useCase.execute({ id });
    return true;
  }
}
