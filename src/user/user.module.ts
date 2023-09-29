import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UsersService } from './services/users.service';
import { IUserRepository } from './contracts/IUser.repository';
import { UserPgRepository } from 'src/pgdb/repositories/UserPg.repository';
import { PgdbModule } from 'src/pgdb/pgdb.module';

@Module({
  imports: [PgdbModule],
  controllers: [UserController],
  providers: [
    UsersService,
    { provide: IUserRepository, useClass: UserPgRepository },
  ],
})
export class UserModule {}
