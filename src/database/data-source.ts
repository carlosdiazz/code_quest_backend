import { envs } from '../config';
import { DataSource } from 'typeorm';

const database_migrations = new DataSource({
  type: 'postgres',
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  database: envs.DB_NAME,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  synchronize: false,
  logging: true,
  entities: ['src/components/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});

export default database_migrations;
