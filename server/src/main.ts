import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

const FRONTEND_URL = process.env.FRONTEND_URL;

async function startServer() {
  const app = await NestFactory.create(AppModule); //express.json() ist bereits active
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors({
    origin: FRONTEND_URL ? [FRONTEND_URL] : true,
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 5000);
}
startServer();
