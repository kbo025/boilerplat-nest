import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRbacDto,
  FilterRbacDto,
  QueryRbacDto,
  RbacAssigmentDto,
  RbacDto,
  RbacLinkDto,
} from '../dtos/rbac.dto';
import { UpdateRbacDto } from '../dtos/rbac.dto';
import { IRbacRepository } from '../contracts/IRbac.repository';
import { QueryResponse } from 'src/common/types/paginator/paginator.type';
import { TypeRbac } from '../entities/base.entity';
import { plainToClass } from 'class-transformer';
import { ILinkRepository } from '../contracts/ILink.repository';
import { IAssignmentRepository } from '../contracts/IAssignment.repository';
import { IUserRepository } from 'src/user/contracts/IUser.repository';

@Injectable()
export class RbacService {
  constructor(
    @Inject(IRbacRepository) private readonly rbacRep: IRbacRepository,
    @Inject(IUserRepository) private readonly userRep: IUserRepository,
    @Inject(ILinkRepository) private readonly linkRep: ILinkRepository,
    @Inject(IAssignmentRepository)
    private readonly assignmentRep: IAssignmentRepository,
  ) {}

  async create(type: TypeRbac, dto: CreateRbacDto): Promise<RbacDto> {
    const response = await this.rbacRep.create(type, dto);
    const rbac = plainToClass(RbacDto, response, {
      excludeExtraneousValues: true,
    });
    return rbac;
  }

  async list(
    type: TypeRbac,
    params: QueryRbacDto,
  ): Promise<QueryResponse<RbacDto, FilterRbacDto> | QueryResponse<RbacDto>> {
    const response = await this.rbacRep.list(type, params);
    response.data = response.data.map((obj) =>
      plainToClass(RbacDto, obj, {
        excludeExtraneousValues: true,
      }),
    );
    return response;
  }

  async get(type: TypeRbac, slug: string): Promise<RbacDto> {
    const response = await this.rbacRep.get(type, slug);
    const rbac = plainToClass(RbacDto, response, {
      excludeExtraneousValues: true,
    });
    return rbac;
  }

  async update(
    type: TypeRbac,
    slug: string,
    dto: UpdateRbacDto,
  ): Promise<RbacDto> {
    const response = await this.rbacRep.update(type, slug, dto);
    return response;
  }

  async delete(type: TypeRbac, slug: string): Promise<boolean> {
    const response = await this.rbacRep.remove(type, slug);
    return response;
  }

  async assingRoleToUser(dto: RbacAssigmentDto): Promise<boolean> {
    const PUser = this.userRep.findByEmail(dto.email);
    const PRole = this.rbacRep.get(TypeRbac.ROLE, dto.slug);
    const resp = await Promise.all([PUser, PRole]);
    const response = await this.assignmentRep.assing(...resp);
    return response;
  }

  async assingPermissionToUser(dto: RbacAssigmentDto): Promise<boolean> {
    const PUser = this.userRep.findByEmail(dto.email);
    const PPermission = this.rbacRep.get(TypeRbac.PERMISSION, dto.slug);
    const resp = await Promise.all([PUser, PPermission]);
    const response = await this.assignmentRep.assing(...resp);
    return response;
  }

  async assingPermissionToRole(dto: RbacLinkDto): Promise<boolean> {
    const PRole = this.rbacRep.get(TypeRbac.ROLE, dto.parent);
    const PPermission = this.rbacRep.get(TypeRbac.PERMISSION, dto.child);
    const resp = await Promise.all([PRole, PPermission]);
    const response = await this.linkRep.assing(...resp);
    return response;
  }

  async revokeRoleToUser(dto: RbacAssigmentDto): Promise<boolean> {
    const PUser = this.userRep.findByEmail(dto.email);
    const PRole = this.rbacRep.get(TypeRbac.ROLE, dto.slug);
    const resp = await Promise.all([PUser, PRole]);
    const response = await this.assignmentRep.revoke(...resp);
    return response;
  }

  async revokePermissionToUser(dto: RbacAssigmentDto): Promise<boolean> {
    const PUser = this.userRep.findByEmail(dto.email);
    const PPermission = this.rbacRep.get(TypeRbac.PERMISSION, dto.slug);
    const resp = await Promise.all([PUser, PPermission]);
    const response = await this.assignmentRep.revoke(...resp);
    return response;
  }

  async revokePermissionToRole(dto: RbacLinkDto): Promise<boolean> {
    const PRole = this.rbacRep.get(TypeRbac.ROLE, dto.parent);
    const PPermission = this.rbacRep.get(TypeRbac.PERMISSION, dto.child);
    const resp = await Promise.all([PRole, PPermission]);
    const response = await this.linkRep.revoke(...resp);
    return response;
  }
}
