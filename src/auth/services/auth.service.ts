import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from 'src/user/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUserEntity } from 'src/user/entities/user.entity';
import { AccessTokenInf, PayloadToken } from '../models/payloadToken.entity';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.UsersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('NOT_ALLOW');
    }

    const isMatch = await bcrypt.compare(password, user.hashPassword);
    if (!isMatch) {
      throw new UnauthorizedException('NOT_ALLOW');
    }

    return user;
  }

  generateJwt(user: IUserEntity): AccessTokenInf {
    const payload: PayloadToken = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
