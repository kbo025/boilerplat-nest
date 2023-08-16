import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export const enviroments = {
  dev: '.env',
  test: '.test.env',
  prod: '.prod.env',
};

export const config = registerAs('config', () => {
  return {
    pg: {
      name: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      pass: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
      host: process.env.POSTGRES_HOST,
    },
    apiKey: process.env.API_KEY,
  };
});

export const configSchema = Joi.object({
  API_KEY: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().hostname().required(),
});
