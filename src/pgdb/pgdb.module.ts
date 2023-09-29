import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { config } from 'src/config';
import { Client } from 'pg';
import { UserPgEntity } from './entities/user/userPg.entity';
import { UserPgRepository } from './repositories/UserPg.repository';
import { IUserRepository } from 'src/user/contracts/IUser.repository';
import { TesteController } from './controllers/teste.controller';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Module({
  imports: [TypeOrmModule.forFeature([UserPgEntity])],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    // {
    //   provide: 'PG',
    //   useFactory: (configService: ConfigType<typeof config>) => {
    //     const { user, host, name, pass, port } = configService.pg;
    //     const client = new Client({
    //       user,
    //       host,
    //       database: name,
    //       password: pass,
    //       port: parseInt(port),
    //     });
    //     client.connect();
    //     return client;
    //   },
    //   inject: [config.KEY],
    // },
    {
      provide: IUserRepository,
      useClass: UserPgRepository,
    },
  ],
  exports: ['API_KEY', IUserRepository, TypeOrmModule],
  controllers: [TesteController],
})
export class PgdbModule {}
