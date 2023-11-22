import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'src/config';
import { ConfigType } from '@nestjs/config';
import { RbacModule } from 'src/rbac/rbac.module';
import { PgdbModule } from 'src/pgdb/pgdb.module';
import { IAuthUserService } from './contracts/user.service';
import { IAuthRbacService } from './contracts/rbac.service';
import { RbacService } from 'src/rbac/services/rbac.service';
import { UsersService } from 'src/user/services/users.service';

@Module({
  imports: [
    RbacModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwt.secret,
          signOptions: { expiresIn: configService.jwt.expireIn },
        };
      },
    }),
    PgdbModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    { provide: IAuthUserService, useClass: UsersService },
    { provide: IAuthRbacService, useClass: RbacService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
