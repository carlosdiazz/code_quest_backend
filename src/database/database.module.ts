import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { envs } from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      database: envs.DB_NAME,
      username: envs.DB_USER,
      password: envs.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
      ssl: envs.STATE === 'DEV' ? false : true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
})
export class DatabaseModule {}
