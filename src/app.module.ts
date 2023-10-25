import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import { DomainModule } from './domain/domain.module';
import { UserModule } from './user/user.module';
// import { CategoryModule } from './category/category.module';
import { RbacModule } from './rbac/rbac.module';
import { PgdbModule } from './pgdb/pgdb.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { config, configSchema, enviroments } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { DataSource } from 'typeorm';

@Module({
  imports: [
    AuthModule,
    // DomainModule,
    UserModule,
    // CategoryModule,
    RbacModule,
    PgdbModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, name, pass, port } = configService.pg;
        return {
          type: 'postgres',
          host,
          port: parseInt(port),
          username: user,
          password: pass,
          database: name,
          synchronize: false,
          autoLoadEntities: true,
          entities: [__dirname + '/pgdb/**/*.entity{.ts,.js}'],
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
