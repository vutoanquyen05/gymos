import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('GYMOS-API');

  // Cấu hình tiền tố toàn cục cho API
  app.setGlobalPrefix('api');

  // Cho phép CORS cho Web frontend và Mobile local preview
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 3005;
  await app.listen(port);
  logger.log(`GYMOS Backend API đang chạy tại: http://localhost:${port}/api`);
}

bootstrap();
