import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_NAME,
  logging: true,
  synchronize: false,
  entities: ['src/pgdb/**/*.entity{.ts,.js}'],
  migrations: ['src/pgdb/migrations/*.ts'],
  migrationsTableName: 'migrations',
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
