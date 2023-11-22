import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRbacDto,
  FilterRbacDto,
  QueryRbacDto,
  CreateRbacAssigmentDto,
  RbacDto,
  CreateRbacLinkDto,
  RbacAssigmentDto,
} from '../dtos/rbac.dto';
import { UpdateRbacDto } from '../dtos/rbac.dto';
import { IRbacRepository } from '../contracts/IRbac.repository';
import { QueryResponse } from 'src/common/types/paginator/paginator.type';
import { TypeRbac } from '../entities/base.entity';
import { plainToClass } from 'class-transformer';
import { ILinkRepository } from '../contracts/ILink.repository';
import { IAssignmentRepository } from '../contracts/IAssignment.repository';
import { IUserRepository } from 'src/user/contracts/IUser.repository';
import { IAssigmentRbacEntity } from '../entities/assignment.entity';
import { ILinkRbacEntity } from '../entities/link.entity';
import { UserDto } from 'src/user/dtos/user.dto';
import { IAuthRbacService } from 'src/auth/contracts/rbac.service';
import { IUserEntity } from 'src/user/entities/user.entity';
import { IRoleEntity } from '../entities/role.entity';
import { IPermissionEntity } from '../entities/permission.entity';

@Injectable()
export class RbacService implements IAuthRbacService {
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

  async assingRoleToUser(dto: CreateRbacAssigmentDto): Promise<boolean> {
    const PUser = this.userRep.findByEmail(dto.email);
    const PRole = this.rbacRep.get(TypeRbac.ROLE, dto.slug);
    const resp = await Promise.all([PUser, PRole]);
    const response = await this.assignmentRep.assing(...resp);
    return response;
  }

  async assingPermissionToUser(dto: CreateRbacAssigmentDto): Promise<boolean> {
    const PUser = this.userRep.findByEmail(dto.email);
    const PPermission = this.rbacRep.get(TypeRbac.PERMISSION, dto.slug);
    const resp = await Promise.all([PUser, PPermission]);
    const response = await this.assignmentRep.assing(...resp);
    return response;
  }

  async assingPermissionToRole(dto: CreateRbacLinkDto): Promise<boolean> {
    const PRole = this.rbacRep.get(TypeRbac.ROLE, dto.parent);
    const PPermission = this.rbacRep.get(TypeRbac.PERMISSION, dto.child);
    const resp = await Promise.all([PRole, PPermission]);
    const response = await this.linkRep.assing(...resp);
    return response;
  }

  async revokeRoleToUser(dto: CreateRbacAssigmentDto): Promise<boolean> {
    const PUser = this.userRep.findByEmail(dto.email);
    const PRole = this.rbacRep.get(TypeRbac.ROLE, dto.slug);
    const resp = await Promise.all([PUser, PRole]);
    const response = await this.assignmentRep.revoke(...resp);
    return response;
  }

  async revokePermissionToUser(dto: CreateRbacAssigmentDto): Promise<boolean> {
    const PUser = this.userRep.findByEmail(dto.email);
    const PPermission = this.rbacRep.get(TypeRbac.PERMISSION, dto.slug);
    const resp = await Promise.all([PUser, PPermission]);
    const response = await this.assignmentRep.revoke(...resp);
    return response;
  }

  async revokePermissionToRole(dto: CreateRbacLinkDto): Promise<boolean> {
    const PRole = this.rbacRep.get(TypeRbac.ROLE, dto.parent);
    const PPermission = this.rbacRep.get(TypeRbac.PERMISSION, dto.child);
    const resp = await Promise.all([PRole, PPermission]);
    const response = await this.linkRep.revoke(...resp);
    return response;
  }

  async getAssigmentsByUser(
    email: string,
  ): Promise<[IAssigmentRbacEntity[], number]> {
    const user = await this.userRep.findByEmail(email);
    const response = await this.assignmentRep.findByUser(user);
    response[0] = response[0].map((e) => {
      return {
        user: plainToClass(UserDto, e, { excludeExtraneousValues: true }),
        permission: plainToClass(RbacDto, e, { excludeExtraneousValues: true }),
      } as RbacAssigmentDto;
    });

    return response;
  }

  async getLinksByRole(slug: string): Promise<[ILinkRbacEntity[], number]> {
    const role = await this.rbacRep.get(TypeRbac.ROLE, slug);
    const response = await this.linkRep.findByRole(role);

    response[0] = response[0].map((e) => {
      return {
        parent: plainToClass(RbacDto, e, { excludeExtraneousValues: true }),
        child: plainToClass(RbacDto, e, { excludeExtraneousValues: true }),
      };
    });

    return response;
  }

  async is(user: IUserEntity, slug: string): Promise<boolean> {
    const { roles } = await this.getAllByUser(user);

    return roles.find((e) => e.slug == slug) ? true : false;
  }

  async can(user: IUserEntity, slug: string): Promise<boolean> {
    const { permissions } = await this.getAllByUser(user);

    return permissions.find((e) => e.slug == slug) ? true : false;
  }

  async getAllByUser(
    user: IUserEntity,
  ): Promise<{ roles: IRoleEntity[]; permissions: IPermissionEntity[] }> {
    const respAssig = await this.assignmentRep.findByUser(user);
    const assigments = respAssig[0];
    const roles = assigments
      .filter((e) => e.permission.type == TypeRbac.PERMISSION)
      .map(
        (e) =>
          plainToClass(RbacDto, e, {
            excludeExtraneousValues: true,
          }) as IRoleEntity,
      );

    const permissions = assigments
      .filter((e) => e.permission.type == TypeRbac.ROLE)
      .map(
        (e) =>
          plainToClass(RbacDto, e, {
            excludeExtraneousValues: true,
          }) as IPermissionEntity,
      );

    let slugs = assigments.map((e) => e.permission.slug);
    while (slugs.length > 0) {
      const respPermissions = await this.linkRep.findByAssigments(slugs);
      slugs = respPermissions.map((e) => e.child.slug);
      const childRoles = respPermissions.map(
        (e) =>
          plainToClass(RbacDto, e, {
            excludeExtraneousValues: true,
          }) as IRoleEntity,
      );

      roles.push(...childRoles);

      const childPerm = respPermissions.map(
        (e) =>
          plainToClass(RbacDto, e, {
            excludeExtraneousValues: true,
          }) as IPermissionEntity,
      );

      permissions.push(...childPerm);
    }

    return { roles, permissions };
  }

  async saveAllRoles(roles: string[]): Promise<boolean> {
    await this.rbacRep.upsertInBatch(TypeRbac.ROLE, roles);
    return true;
  }

  async saveAllPermissions(permissions: string[]): Promise<boolean> {
    await this.rbacRep.upsertInBatch(TypeRbac.PERMISSION, permissions);
    return true;
  }
}
