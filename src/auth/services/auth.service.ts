import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from 'src/user/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUserEntity } from 'src/user/entities/user.entity';
import { AccessTokenInf, PayloadToken } from '../models/payloadToken.entity';
import { IUserRepository } from 'src/user/contracts/IUser.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUserEntity> {
    try {
      const user = await this.userRepository.findByEmail(email);
      const isMatch = await compare(password, user.hashPassword);

      if (!isMatch) {
        throw new UnauthorizedException('NOT_ALLOW');
      }

      return user;
    } catch {
      throw new UnauthorizedException('NOT_ALLOW');
    }
  }

  generateJwt(user: IUserEntity): AccessTokenInf {
    const payload: PayloadToken = { sub: user.id, email: user.email };
    const { id, email } = user;
    return {
      access_token: this.jwtService.sign(payload),
      user: { id, email },
    };
  }
}
