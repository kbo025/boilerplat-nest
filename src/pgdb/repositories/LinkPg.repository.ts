import { ILinkRepository } from 'src/rbac/contracts/ILink.repository';
import { TypeRbac } from 'src/rbac/entities/base.entity';
import { RbacPgEntity } from '../entities/rbac/rbacPg.entity';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LinkPgEntity } from '../entities/rbac/linkPg.entity';
import { ILinkRbacEntity } from 'src/rbac/entities/link.entity';

export class LinkPgRepository implements ILinkRepository {
  constructor(
    @InjectRepository(LinkPgEntity)
    private readonly linkRep: Repository<LinkPgEntity>,
  ) {}

  async assing(parent: RbacPgEntity, child: RbacPgEntity): Promise<boolean> {
    if (parent.type === TypeRbac.PERMISSION || child.type === TypeRbac.ROLE) {
      throw new BadRequestException('ROLE_PERMISSION_CONFLICT');
    }

    const response = await this.linkRep.save({ parent, child });
    console.log(response);

    return true;
  }

  async revoke(parent: RbacPgEntity, child: RbacPgEntity): Promise<boolean> {
    const response = await this.linkRep.delete({ parent, child });
    console.log(response);

    return true;
  }

  async findByRole(role: RbacPgEntity): Promise<[ILinkRbacEntity[], number]> {
    const response = await this.linkRep.findAndCount({
      where: { parent: role },
    });

    return response;
  }

  async findByAssigments(parents: string[]): Promise<ILinkRbacEntity[]> {
    const response = await this.linkRep.find({
      where: { parent: { slug: In(parents) } },
      relations: {
        child: true,
      },
    });

    return response;
  }
}
