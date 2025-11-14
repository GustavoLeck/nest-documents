import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as momentTimezone from 'moment-timezone';
import * as dotenv from 'dotenv';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('InMeta API')
    .setDescription(
      'Api for creating, editing, updating and removing InMeta registrations.',
    )
    .setVersion('1.0')
    .setContact(
      'Developer Support',
      'leck.com/contact',
      'gustavoleck@hotmail.com',
    )
    .build();

  app.useGlobalInterceptors();
  app.useGlobalFilters();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  Date.prototype.toJSON = function (): any {
    return momentTimezone
      .tz(this, 'America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
