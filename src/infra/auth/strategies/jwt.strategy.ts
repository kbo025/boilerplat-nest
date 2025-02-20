import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { ConfigType } from '@nestjs/config';
import { config } from 'src/config';
import { PayloadToken } from '../models/payloadToken.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwt.secret,
    });
  }

  validate(payload: PayloadToken): PayloadToken {
    return payload;
  }
}
