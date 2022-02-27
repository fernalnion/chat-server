import * as Joi from 'joi';
import { ValidationError } from 'joi';

const ConfigValidator = Joi.object().keys({
  REFRESH_TOKEN_EXPIRES_IN_MINUTES: Joi.number()
    .required()
    .description('REFRESH_TOKEN_EXPIRES_IN_MINUTES'),
  ACCESS_TOKEN_EXPIRES_IN_MINUTES: Joi.number()
    .required()
    .description('ACCESS_TOKEN_EXPIRES_IN_MINUTES'),
  APPLICATION_SECRET: Joi.string()
    .min(32)
    .max(32)
    .required()
    .description('APPLICATION_SECRET'),
  APPLICATION_PORT: Joi.number().required().description('APPLICATION_PORT'),
  MONGO_CONNECTION_STRING: Joi.string()
    .required()
    .description('MONGO_CONNECTION_STRING'),
});

const validator = (
  config: any,
): Promise<{ error: ValidationError; value: any }> =>
  ConfigValidator.validateAsync(config, {
    abortEarly: false,
    allowUnknown: true,
  });
export { ConfigValidator, validator };
