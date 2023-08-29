import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { config } from 'src/config';
import { Client } from 'pg';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  imports: [
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
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, name, pass, port } = configService.pg;
        const client = new Client({
          user,
          host,
          database: name,
          password: pass,
          port: parseInt(port),
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class PgdbModule {}
