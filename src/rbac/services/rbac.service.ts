import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRbacDto,
  FilterRbacDto,
  QueryRbacDto,
  RbacDto,
  RbacRelationsDto,
} from '../dtos/rbac.dto';
import { UpdateRbacDto } from '../dtos/rbac.dto';
import { IRbacRepository } from '../contracts/IRbac.repository';
import { QueryResponse } from 'src/common/types/paginator/paginator.type';
import { TypeRbac } from '../entities/base.entity';

@Injectable()
export class RbacService {
  constructor(
    @Inject(IRbacRepository) private readonly rbacRep: IRbacRepository,
  ) {}

  async createPermission(dto: CreateRbacDto): Promise<RbacDto> {
    const response = await this.rbacRep.create(TypeRbac.PERMISSION, dto);
    return response;
  }

  async listPermissions(
    params: QueryRbacDto,
  ): Promise<QueryResponse<RbacDto, FilterRbacDto> | QueryResponse<RbacDto>> {
    const response = await this.rbacRep.list(params);
    return response;
  }

  async getPermission(slug: string): Promise<RbacDto> {
    const response = await this.rbacRep.get(slug);
    return response;
  }

  async updatePermission(slug: string, dto: UpdateRbacDto): Promise<RbacDto> {
    const response = await this.rbacRep.update(slug, dto);
    return response;
  }

  async deletePermission(slug: string): Promise<boolean> {
    const response = await this.rbacRep.remove(slug);
    return response;
  }

  async revoke(dto: RbacRelationsDto): Promise<boolean> {
    const response = await this.rbacRep.revoke(dto);
    return response;
  }

  async assing(dto: RbacRelationsDto): Promise<boolean> {
    const response = await this.rbacRep.assing(dto);
    return response;
  }

  async createRole(dto: CreateRbacDto) {
    const response = await this.rbacRep.create(TypeRbac.ROLE, dto);
    return response;
  }

  async getRole(slug: string): Promise<RbacDto> {
    const response = await this.rbacRep.get(slug);
    return response;
  }

  async listRoles(
    params: QueryRbacDto,
  ): Promise<QueryResponse<RbacDto, FilterRbacDto> | QueryResponse<RbacDto>> {
    const response = await this.rbacRep.list(params);
    return response;
  }

  async updateRole(slug: string, dto: UpdateRbacDto) {
    const response = await this.rbacRep.update(slug, dto);
    return response;
  }

  async deleteRole(slug: string) {
    const response = await this.rbacRep.remove(slug);
    return response;
  }
}
