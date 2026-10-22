import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.use(helmet());

  // 2.cors yapılandırması

  app.enableCors({
    origin: true,
    methods: 'GET, POST, DELETE, PUT, HEAD ,PATCH',
    credentials: true,
  });

  // globalde veri doğrulama ve veriyi dönğştürme
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //dto dışında gelen verilri temizler
      forbidNonWhitelisted: true, // dto dışında gelen veriye hata fırlatır
      transform: true, //gelen veriyi JSONdan fto formatına dönğştürür
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
