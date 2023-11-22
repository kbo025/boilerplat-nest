import { RbacDto } from '../dtos/rbac.dto';
import { ILinkRbacEntity } from '../entities/link.entity';

export interface ILinkRepository {
  assing(parent: RbacDto, child: RbacDto): Promise<boolean>;
  revoke(parent: RbacDto, child: RbacDto): Promise<boolean>;
  findByRole(role: RbacDto): Promise<[ILinkRbacEntity[], number]>;
  findByAssigments(parents: string[]): Promise<ILinkRbacEntity[]>;
}

export const ILinkRepository = Symbol('ILinkRepository');
