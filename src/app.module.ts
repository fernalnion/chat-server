import { Module } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import winston from 'winston';
import { LogService } from './services/log.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from './config';
const Logger = WinstonModule.forRoot({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike('Yaali', {
          prettyPrint: true,
        }),
      ),
    }),
  ],
});

@Module({
  imports: [
    ConfigModule.forRoot(),
    Logger,
    MongooseModule.forRoot(Config.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, LogService],
})
export class AppModule {}
