import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { config } from 'src/config';
import { ConfigType } from '@nestjs/config';
import { RbacModule } from 'src/rbac/rbac.module';
import { UsersService } from 'src/user/services/users.service';
import { IUserRepository } from 'src/user/contracts/IUser.repository';
import { UserPgRepository } from 'src/pgdb/repositories/UserPg.repository';
import { PgdbModule } from 'src/pgdb/pgdb.module';

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
    { provide: IUserRepository, useClass: UserPgRepository },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
