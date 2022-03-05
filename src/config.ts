import dotenv from 'dotenv';
import { utilities, WinstonModule } from 'nest-winston';
import winston from 'winston';
import { CONFIG } from './types/config.type';
import { ConfigurationSchemaValidator } from './validators/config.validator';

// Config
dotenv.config();
const {
  MONGO_USERNAME,
  MONGO_PASSOWRD,
  MONGO_SERVER,
  MONGO_DB_NAME,
  CHAT_SERVER_PORT,
  CHAT_SERVER_ENV,
  MONGODB_CONNECTION_STRING,
  MONGODB_CONNECTION_STRING_LOGGER,
} = process.env;
const config = {
  MONGO_USERNAME,
  MONGO_PASSOWRD,
  MONGO_SERVER,
  MONGO_DB_NAME:
    MONGO_DB_NAME && CHAT_SERVER_ENV && CHAT_SERVER_ENV === 'PROD'
      ? MONGO_DB_NAME
      : MONGO_DB_NAME
      ? `${MONGO_DB_NAME}_dev`
      : null,
  CHAT_SERVER_PORT,
  CHAT_SERVER_ENV,
  MONGODB_CONNECTION_STRING:
    MONGODB_CONNECTION_STRING ||
    `mongodb://${MONGO_USERNAME}:${MONGO_PASSOWRD}@${MONGO_SERVER}:27017/?authSource=admin`,
  MONGODB_CONNECTION_STRING_LOGGER:
    MONGODB_CONNECTION_STRING_LOGGER ||
    `mongodb://${MONGO_USERNAME}:${MONGO_PASSOWRD}@${MONGO_SERVER}:27017/logger?authSource=admin`,
};

const { value: configurationValues, error: configurationError } =
  ConfigurationSchemaValidator.prefs({ errors: { label: 'key' } }).validate(
    config,
  );

if (configurationError) {
  throw new Error(
    `Configuration validation error: ${configurationError.message}`,
  );
}

export const Config: CONFIG = configurationValues as CONFIG;

export const Logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
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
