import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from 'src/user/contracts/IUser.repository';
import { UserPgEntity } from '../entities/user/userPg.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IQueryDto,
  QueryResponse,
} from 'src/common/types/paginator/paginator.type';
import {
  CreateUserDto,
  FilterUserDto,
  UpdateUserDto,
} from 'src/user/dtos/user.dto';
import { IUserEntity } from 'src/user/entities/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UserPgRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserPgEntity)
    private readonly userRep: Repository<UserPgEntity>,
  ) {}

  async findUser(id: number): Promise<IUserEntity> {
    const user = await this.userRep.findOne({ where: { id, active: true } });
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
    return user;
  }

  async findByEmail(email: string): Promise<IUserEntity> {
    const user = await this.userRep.findOne({ where: { email, active: true } });
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
    return user;
  }

  async createUser(data: CreateUserDto): Promise<IUserEntity> {
    const { email } = data;
    const exists = await this.userRep.findOne({ where: { email } });
    if (exists) {
      throw new ConflictException('USER_ALREADY_EXITS');
    }

    const user = await this.userRep.save({
      email: data.email,
      hashPassword: await bcrypt.hash(data.password, 10),
    });
    return user;
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<IUserEntity> {
    const user = await this.userRep.findOne({ where: { id, active: true } });
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
    const { email } = data;
    const exists = await this.userRep.findOne({ where: { email } });
    if (exists && exists.id != id) {
      throw new ConflictException('USER_ALREADY_EXITS');
    }

    const password = await bcrypt.hash(data.password, 10);
    await this.userRep.update({ id }, { hashPassword: password, email });
    return { ...user, email };
  }

  async deleteUser(id: number): Promise<boolean> {
    const resp = await this.userRep.update(
      { id },
      {
        active: false,
        deletedAt: new Date(),
      },
    );
    if (resp.affected === 0) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    return true;
  }

  saveUser(data: UpdateUserDto): Promise<IUserEntity> {
    throw new Error('Method not implemented.');
  }

  async findAllUsers(
    dto: IQueryDto<FilterUserDto>,
  ): Promise<QueryResponse<IUserEntity, FilterUserDto>> {
    const { itemsPerPage, sortBy, page, filters } = dto;
    const qb = this.userRep.createQueryBuilder('UserPgEntity');
    if (sortBy) {
      for (const sort of sortBy) {
        qb.orderBy(`UserPgEntity.${sort[0]}`, sort[1]);
      }
    }

    qb.skip((page - 1) * itemsPerPage).take(itemsPerPage);

    const totalItems = await qb.getCount();
    const { entities } = await qb.getRawAndEntities();

    let totalPages = totalItems / page;
    totalPages = totalPages + (totalPages % 1 == 0 ? 0 : 1);
    const resp: QueryResponse<UserPgEntity, FilterUserDto> = {
      data: entities,
      meta: {
        itemsPerPage,
        totalItems,
        currentPage: page,
        totalPages,
        sortBy: sortBy,
        filter: filters,
      },
    };

    return resp;
  }
}
