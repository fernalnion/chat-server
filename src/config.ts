import * as dotenv from 'dotenv';
import { NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { IConfig } from './types/config';
import { ConfigValidator } from './validators/config.validator';

dotenv.config();

const tempdata: IConfig = <IConfig>{
  APPLICATION_PORT: parseInt(process.env.APPLICATION_PORT),
  REFRESH_TOKEN_EXPIRES_IN_MINUTES: parseInt(
    process.env.REFRESH_TOKEN_EXPIRES_IN_MINUTES,
  ),
  ACCESS_TOKEN_EXPIRES_IN_MINUTES: parseInt(
    process.env.ACCESS_TOKEN_EXPIRES_IN_MINUTES,
  ),
  APPLICATION_SECRET: process.env.APPLICATION_SECRET,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
};
const { value: configValue, error: configValidatorError } =
  ConfigValidator.prefs({ errors: { label: 'key' } }).validate(tempdata);

if (configValidatorError) {
  throw new Error(`Config validation errorP:${configValidatorError.message}`);
}

const Config: IConfig = <IConfig>configValue;

const Logger = new NestjsWinstonLoggerService({
  format: format.combine(
    format.timestamp({ format: 'isoDateTime' }),
    format.json(),
    format.colorize({ all: true }),
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
    new transports.Console(),
  ],
});

export { Logger, Config };
