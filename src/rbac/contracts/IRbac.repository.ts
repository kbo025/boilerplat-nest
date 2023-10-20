import { QueryResponse } from 'src/common/types/paginator/paginator.type';
import {
  CreateRbacDto,
  FilterRbacDto,
  QueryRbacDto,
  RbacDto,
} from '../dtos/rbac.dto';
import { UpdateRbacDto } from '../dtos/rbac.dto';
import { TypeRbac } from '../entities/base.entity';

export interface IRbacRepository {
  get(type: TypeRbac, slug: string): Promise<RbacDto>;
  create(type: TypeRbac, dto: CreateRbacDto): Promise<RbacDto>;
  list(
    type: TypeRbac,
    dto: QueryRbacDto,
  ): Promise<QueryResponse<RbacDto, FilterRbacDto> | QueryResponse<RbacDto>>;
  update(type: TypeRbac, data: UpdateRbacDto): Promise<RbacDto>;
  remove(type: TypeRbac, slug: string): Promise<boolean>;
}

export const IRbacRepository = Symbol('IRbacRepository');
