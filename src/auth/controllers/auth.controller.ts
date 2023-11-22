import { Controller, Req, Post, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { IUserEntity } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Public } from '../decorators/public.decorator';
import { AccessTokenInf } from '../models/payloadToken.entity';

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
  @Get('me')
  testLogin(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('is/:slug')
  async userIs(@Req() req: Request, @Param('slug') slug: string) {
    const ati = req.user as AccessTokenInf;
    return this.authService.is(ati, slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get('can/:slug')
  async userCan(@Req() req: Request, @Param('slug') slug: string) {
    const ati = req.user as AccessTokenInf;
    return this.authService.can(ati, slug);
  }

  @UseGuards(JwtAuthGuard)
  @Public()
  @Get('test-public')
  testPublic(@Req() req: Request) {
    const user = req.user as IUserEntity;
    return this.authService.generateJwt(user);
  }
}
