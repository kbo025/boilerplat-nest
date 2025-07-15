import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { DomainModule } from 'src/domain/domain.module';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { UserPrismaRepository } from 'src/infra/prisma/repositories/UserPrisma.repository';
import { UserController } from './controllers/user.controller';

@Module({
  providers: [UsersService, UserPrismaRepository],
  controllers: [UserController],
  imports: [DomainModule, PrismaModule],
})
export class PresentationModule {}
