import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { Config, Logger } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Chat Server')
    .setDescription('Chat API server')
    .setVersion('1.0.0')
    .addTag('chat')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useLogger(Logger);

  app.useStaticAssets(join(__dirname, '..', 'static'));
  await app.listen(Config.APPLICATION_PORT);
}
bootstrap();
