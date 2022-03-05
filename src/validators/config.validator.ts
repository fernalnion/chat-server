import Joi, { ValidationError } from 'joi';

const ConfigurationSchemaValidator = Joi.object().keys({
  MONGO_USERNAME: Joi.string().required().description('MONGO_USERNAME'),
  MONGO_PASSOWRD: Joi.string().required().description('MONGO_PASSOWRD'),
  MONGO_SERVER: Joi.string().required().description('MONGO_SERVER'),
  CHAT_SERVER_PORT: Joi.number().required().description('CHAT_SERVER_PORT'),
  MONGO_DB_NAME: Joi.string().required().description('MONGO_DB_NAME'),
  CHAT_SERVER_ENV: Joi.string().description('CHAT_SERVER_ENV').default('DEV'),
  MONGODB_CONNECTION_STRING: Joi.number()
    .required()
    .description('MONGODB_CONNECTION_STRING'),
  MONGODB_CONNECTION_STRING_LOGGER: Joi.number()
    .required()
    .description('MONGODB_CONNECTION_STRING_LOGGER'),
  DEBUG: Joi.boolean().description('DEBUG').default(false),
});

const ConfigurationValidator = (
  config: any,
): Promise<{ error: ValidationError; value: any }> =>
  ConfigurationSchemaValidator.validateAsync(config, {
    abortEarly: false,
    allowUnknown: true,
  });

export { ConfigurationSchemaValidator, ConfigurationValidator };
