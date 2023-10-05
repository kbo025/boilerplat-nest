import { Controller, Req, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { IUserEntity } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as IUserEntity;
    return this.authService.generateJwt(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test-auth')
  testLogin(@Req() req: Request) {
    const user = req.user as IUserEntity;
    return this.authService.generateJwt(user);
  }

  @UseGuards(JwtAuthGuard)
  @Public()
  @Get('test-public')
  testPublic(@Req() req: Request) {
    const user = req.user as IUserEntity;
    return this.authService.generateJwt(user);
  }
}
