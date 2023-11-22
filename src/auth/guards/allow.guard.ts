import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator';
import { AccessTokenInf } from 'src/auth/models/payloadToken.entity';
import { config } from 'src/config';
import { ConfigType } from '@nestjs/config';
import { IAuthRbacService } from '../contracts/rbac.service';

@Injectable()
export class AllowGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject(IAuthRbacService) private rbacService: IAuthRbacService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get(ROLES_KEY, context.getHandler());
    const permissions: string[] = this.reflector.get(
      PERMISSIONS_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const { user } = request.user as AccessTokenInf;

    if (this.configService.rbacInsert) {
      const pRoles = this.rbacService.saveAllRoles(roles);
      const pPermissions = this.rbacService.saveAllPermissions(permissions);

      await Promise.all([pRoles, pPermissions]);
    }

    if (
      this.configService.superadminEmail.toLowerCase() ===
      user.email.toLowerCase()
    ) {
      return true;
    }

    if (Array.isArray(user.roles) && user.roles.length > 0) {
      if (user.roles.includes(this.configService.superadminRole)) {
        return true;
      }

      const intercepRoles = user.roles.filter((value: string) =>
        roles.includes(value),
      );

      if (intercepRoles.length < roles.length) {
        return false;
      }

      if (Array.isArray(permissions) && permissions.length > 0) {
        if (Array.isArray(user.permissions) && user.roles.length > 0) {
          const intercepPerm = user.permissions.filter((value: string) =>
            permissions.includes(value),
          );

          if (intercepPerm.length < permissions.length) {
            return false;
          }
        }
      }

      return true;
    }

    return false;
  }
}
