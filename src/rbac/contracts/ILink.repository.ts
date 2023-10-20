import { RbacDto } from '../dtos/rbac.dto';

export interface ILinkRepository {
  assing(parent: RbacDto, child: RbacDto): Promise<boolean>;
  revoke(parent: RbacDto, child: RbacDto): Promise<boolean>;
}

export const ILinkRepository = Symbol('ILinkRepository');
