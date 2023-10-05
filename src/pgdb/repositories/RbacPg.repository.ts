import { QueryResponse } from 'src/common/types/paginator/paginator.type';
import { IRbacRepository } from 'src/rbac/contracts/IRbac.repository';
import {
  RbacRelationsDto,
  RbacDto,
  CreateRbacDto,
  QueryRbacDto,
  FilterRbacDto,
  UpdateRbacDto,
} from 'src/rbac/dtos/rbac.dto';

export class RbacPgRepository implements IRbacRepository {
  revoke(dto: RbacRelationsDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  assing(dto: RbacRelationsDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  get(slug: string): Promise<RbacDto> {
    throw new Error('Method not implemented.');
  }

  create(dto: CreateRbacDto): Promise<RbacDto> {
    throw new Error('Method not implemented.');
  }

  list(
    params: QueryRbacDto,
  ): Promise<QueryResponse<RbacDto, FilterRbacDto> | QueryResponse<RbacDto>> {
    throw new Error('Method not implemented.');
  }

  update(slug: string, dto: UpdateRbacDto): Promise<RbacDto> {
    throw new Error('Method not implemented.');
  }

  remove(slug: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
