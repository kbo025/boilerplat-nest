import { Global, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenInf } from '../models/payloadToken.entity';
import { IUserEntity } from 'src/domain/entities/IUser.entity';

@Global()
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<IUserEntity> {
    // try {
    //   const user = await this.userRepository.findByEmail(email);
    //   const isMatch = await compare(password, user.password);

    //   if (!isMatch) {
    //     throw new UnauthorizedException('NOT_ALLOW');
    //   }

    //   return user;
    // } catch {
    //   throw new UnauthorizedException('NOT_ALLOW');
    // }
    console.log(`${email} ${password}`);
    throw new UnauthorizedException('NOT_ALLOW');
  }

  async generateJwt(user: IUserEntity): Promise<AccessTokenInf> {
    // const payload: PayloadToken = { sub: user.id, email: user.email };
    // const { permissions, roles } = await this.rbacService.getAllByUser(user);
    // const { id, email } = user;
    // return {
    //   access_token: this.jwtService.sign(payload),
    //   user: {
    //     id,
    //     email,
    //     roles: roles.map((e) => e.slug),
    //     permissions: permissions.map((e) => e.slug),
    //   },
    // };
    console.log(JSON.stringify(user));
    throw new UnauthorizedException('NOT_ALLOW');
  }

  async is(ati: AccessTokenInf, slug: string) {
    // const user = await this.userRepository.findByEmail(ati.user.email);
    // const response = await this.rbacService.is(user, slug);

    // return { response };
    console.log(JSON.stringify(ati));
    console.log(JSON.stringify(slug));
    throw new UnauthorizedException('NOT_ALLOW');
  }

  async can(ati: AccessTokenInf, slug: string) {
    // const user = await this.userRepository.findByEmail(ati.user.email);
    // const response = await this.rbacService.can(user, slug);

    // return { response };
    console.log(JSON.stringify(ati));
    console.log(JSON.stringify(slug));
    throw new UnauthorizedException('NOT_ALLOW');
  }
}
