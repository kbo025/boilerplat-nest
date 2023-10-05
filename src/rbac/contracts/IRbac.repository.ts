import { QueryResponse } from 'src/common/types/paginator/paginator.type';
import {
  CreateRbacDto,
  FilterRbacDto,
  QueryRbacDto,
  RbacDto,
  RbacRelationsDto,
} from '../dtos/rbac.dto';
import { UpdateRbacDto } from '../dtos/rbac.dto';

export interface IRbacRepository {
  revoke(dto: RbacRelationsDto): Promise<boolean>;
  assing(dto: RbacRelationsDto): Promise<boolean>;
  get(slug: string): Promise<RbacDto>;
  create(dto: CreateRbacDto): Promise<RbacDto>;
  list(
    params: QueryRbacDto,
  ): Promise<QueryResponse<RbacDto, FilterRbacDto> | QueryResponse<RbacDto>>;
  update(slug: string, dto: UpdateRbacDto): Promise<RbacDto>;
  remove(slug: string): Promise<boolean>;
}

export const IRbacRepository = Symbol('IRbacRepository');
