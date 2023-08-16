import { Injectable } from '@nestjs/common';
import { CreateRbacDto } from '../dtos/rbac.dto';
import { UpdateRbacDto } from '../dtos/rbac.dto';

@Injectable()
export class RbacService {
  createRole(dto: CreateRbacDto) {
    throw new Error('Method not implemented.');
  }
  listRoles(page: number, itemsPerPage: number, filters: object) {
    throw new Error('Method not implemented.');
  }
  getRole(slug: string) {
    throw new Error('Method not implemented.');
  }
  updateRole(slug: string, dto: UpdateRbacDto) {
    throw new Error('Method not implemented.');
  }
  deleteRole(slug: string) {
    throw new Error('Method not implemented.');
  }
  async createPermission(dto: CreateRbacDto) {
    throw new Error('Method not implemented.');
  }
  async listPermissions(page: number, itemsPerPage: number, filters: object) {
    throw new Error('Method not implemented.');
  }
  async getPermission(slug: string) {
    throw new Error('Method not implemented.');
  }
  async updatePermission(slug: string, dto: UpdateRbacDto) {
    throw new Error('Method not implemented.');
  }
  async deletePermission(slug: string) {
    throw new Error('Method not implemented.');
  }
}
