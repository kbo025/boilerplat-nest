import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { UserPgRepository } from '../repositories/UserPg.repository';
import { IUserRepository } from 'src/user/contracts/IUser.repository';

@Controller('teste')
export class TesteController {
  constructor(@Inject(IUserRepository) private userRep: UserPgRepository) {}

  @Get('/teste')
  @HttpCode(HttpStatus.OK)
  async teste() {
    const user = await this.userRep.createUser({
      email: 'teste3@email.com',
      password: '123456789',
    });
    return user;
  }
}
