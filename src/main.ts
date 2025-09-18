import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('MAIN');
  logger.verbose(envs);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-require-imports
  await app.register(require('@fastify/multipart'));

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const { PORT } = envs;
  await app.listen(PORT, '0.0.0.0');
  logger.debug(`🚀🚀🚀🚀🔥🔥App is ready  on port!!!!!! ${PORT}🔥🔥🚀🚀🚀🚀`);
}

void bootstrap();

function handleError(error: unknown) {
  console.error(error);
  process.exit(1);
}

process.on('uncaughtException', handleError);
