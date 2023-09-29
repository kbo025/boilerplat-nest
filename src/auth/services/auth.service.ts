import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UsersService } from 'src/user/services/users.service';

@Injectable()
export class AuthService {
  constructor(private UsersService: UsersService) {}

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
}
