import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DomainModule } from './domain/domain.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { RbacModule } from './rbac/rbac.module';

@Module({
  imports: [AuthModule, DomainModule, UserModule, CategoryModule, RbacModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
