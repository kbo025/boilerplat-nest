import {
  IQueryDto,
  QueryResponse,
} from 'src/domain/common/paginator/paginator.type';
import { IUserEntity, IUsersFilters } from 'src/domain/entities/IUser.entity';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';
import { PrismaService } from '../prisma.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async createUser(data: Partial<IUserEntity>): Promise<IUserEntity> {
    const { name, email, password } = data;
    const response = await this.prisma.client.user.create({
      data: { name, email, password },
    });

    return response;
  }

  async updateUser(
    id: number,
    data: Partial<IUserEntity>,
  ): Promise<IUserEntity> {
    const { name, email, password } = data;
    const response = await this.prisma.client.user.update({
      where: { id },
      data: { name, email, password },
    });

    return response;
  }

  async findUser(id: number): Promise<IUserEntity> {
    const response = await this.prisma.client.user.findFirst({ where: { id } });
    return response;
  }

  async findAllUsers(
    dto: IQueryDto<IUsersFilters>,
  ): Promise<
    QueryResponse<IUserEntity, IUsersFilters> | QueryResponse<IUserEntity>
  > {
    const { itemsPerPage, sortBy, page, filters } = dto;
    const take = itemsPerPage;
    const skip = (page - 1) * itemsPerPage;

    const totalItems = await this.prisma.client.user.count({
      where: {
        name: filters?.name
          ? {
              contains: filters.name,
              mode: 'insensitive',
            }
          : undefined,
        email: filters?.email
          ? {
              contains: filters.email,
              mode: 'insensitive',
            }
          : undefined,
      },
    });
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const users = await this.prisma.client.user.findMany({
      take,
      skip,
      where: {
        name: filters?.name
          ? {
              contains: filters.name,
              mode: 'insensitive',
            }
          : undefined,
        email: filters?.email
          ? {
              contains: filters.email,
              mode: 'insensitive',
            }
          : undefined,
      },
    });

    const resp: QueryResponse<IUserEntity, IUsersFilters> = {
      data: users,
      meta: {
        itemsPerPage,
        totalItems,
        currentPage: page,
        totalPages,
        sortBy,
        filters,
      },
    };

    return resp;
  }

  async deleteUser(id: number): Promise<boolean> {
    await this.prisma.client.user.delete({ id });
    return true;
  }
}
