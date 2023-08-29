import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DomainModule } from './domain/domain.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { RbacModule } from './rbac/rbac.module';
import { PgdbModule } from './pgdb/pgdb.module';
import { ConfigModule } from '@nestjs/config';
import { config, configSchema, enviroments } from './config';

console.log('config', config);

@Module({
  imports: [
    AuthModule,
    DomainModule,
    UserModule,
    CategoryModule,
    RbacModule,
    PgdbModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
