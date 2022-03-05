import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { set } from 'mongoose';
import { Config } from './config';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { LoggerService } from './services/logger.service';

async function bootstrap() {
  set('debug', Config.DEBUG);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder()
    .setTitle('GajaYaali API')
    .setDescription('GajaYaali API documentation')
    .setVersion('1.0.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-KEY',
        in: 'header',
      },
      'access-key',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useLogger(new LoggerService());
  await app.listen(Config.CHAT_SERVER_PORT);

  const exitHandler = async () => {
    if (app) {
      await app.close();
      new LoggerService().log('Server closed');
      process.exit(1);
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: unknown) => {
    new LoggerService().error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    new LoggerService().log('SIGTERM received');
    if (app) {
      app.close();
    }
  });
}
bootstrap();
