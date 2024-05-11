import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { LocalAuthGuard } from './shared/guards/local.guard';
import { ValidationPipe } from '@nestjs/common';
import * as multer from 'multer';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard';
global.fetch = require('node-fetch');
async function bootstrap() {
  dotenv.config();

  // const app = await NestFactory.create(AppModule, {
  //   bodyParser: true,
  // });
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.init();
  // app.enableCors();
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(multer)
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.text({ type: 'text/html' }))
  app.use(bodyParser.json())
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new LocalAuthGuard());
  app.useGlobalGuards(new JwtAuthGuard());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(4000);
}
bootstrap();