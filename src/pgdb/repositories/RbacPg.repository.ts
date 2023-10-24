import { QueryResponse } from 'src/common/types/paginator/paginator.type';
import { IRbacRepository } from 'src/rbac/contracts/IRbac.repository';
import {
  RbacDto,
  QueryRbacDto,
  FilterRbacDto,
  UpdateRbacDto,
} from 'src/rbac/dtos/rbac.dto';
import { TypeRbac } from 'src/rbac/entities/base.entity';
import slugify from 'slugify';
import { RbacPgEntity } from '../entities/rbac/rbacPg.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class RbacPgRepository implements IRbacRepository {
  constructor(
    @InjectRepository(RbacPgEntity)
    private readonly rbacRep: Repository<RbacPgEntity>,
  ) {}

  async get(type: TypeRbac, slug: string): Promise<RbacDto> {
    const rbac = await this.rbacRep.findOne({
      where: { slug, type, active: true },
    });
    if (!rbac) {
      throw new NotFoundException('RBAC_NOT_FOUND');
    }

    return rbac;
  }

  async create(type: TypeRbac, data: RbacDto): Promise<RbacDto> {
    const { name, description } = data;
    const slug = slugify(name, {
      replacement: '-',
      remove: undefined,
      lower: true,
      strict: false,
      locale: 'vi',
      trim: true,
    });
    const exists = await this.rbacRep.findOne({ where: { slug, type } });
    if (exists) {
      throw new ConflictException('RBAC_ALREADY_EXITS');
    }

    const rbac = await this.rbacRep.save({
      name,
      slug,
      description,
    });

    return rbac;
  }

  async list(
    type: TypeRbac,
    dto: QueryRbacDto,
  ): Promise<QueryResponse<RbacDto, FilterRbacDto> | QueryResponse<RbacDto>> {
    const { itemsPerPage, sortBy, page, filters } = dto;
    const qb = this.rbacRep.createQueryBuilder('RbacPgEntity');
    if (sortBy) {
      for (const sort of sortBy) {
        qb.orderBy(`RbacPgEntity.${sort[0]}`, sort[1]);
      }
    }

    qb.skip((page - 1) * itemsPerPage).take(itemsPerPage);
    if (dto.filters.slug) {
      qb.where('RbacPgEntity.slug like :slug', {
        email: `%${dto.filters.slug.toLowerCase()}%`,
      }).andWhere('RbacPgEntity.type like :type', { type });
    }
    const totalItems = await qb.getCount();
    const { entities } = await qb.getRawAndEntities();

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const resp: QueryResponse<RbacPgEntity, FilterRbacDto> = {
      data: entities,
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

  async update(
    type: TypeRbac,
    slug: string,
    data: UpdateRbacDto,
  ): Promise<RbacDto> {
    const exists = await this.rbacRep.findOne({ where: { slug, type } });
    if (!exists) {
      throw new NotFoundException('ROLE_PERMISSION_DO_NOT_EXITS');
    }

    const { name, description } = data;
    const newSlug = slugify(name, {
      replacement: '-',
      remove: undefined,
      lower: true,
      strict: false,
      locale: 'vi',
      trim: true,
    });

    const newExists = await this.rbacRep.findOne({
      where: { slug: newSlug, type },
    });
    if (newExists) {
      throw new NotFoundException('ROLE_PERMISSION_ALREADY_EXITS');
    }

    const result = await this.rbacRep.update(
      { id: exists.id },
      { name, description, slug: newSlug },
    );

    return result.raw;
  }

  async remove(type: TypeRbac, slug: string): Promise<boolean> {
    const resp = await this.rbacRep.update(
      { slug, type },
      {
        active: false,
        deletedAt: new Date(),
      },
    );
    if (resp.affected === 0) {
      throw new NotFoundException('ROLE_PERMISSION_NOT_FOUND');
    }

    return true;
  }
}
