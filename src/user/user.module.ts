import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {}
