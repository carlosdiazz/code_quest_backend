import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  STATE: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PORT: number;
  DB_HOST: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().default(4000),
    STATE: joi.string().default('DEV'),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config Validation Error ENV ${error.message}`);
}

const enVars: EnvVars = value;

export const envs: EnvVars = {
  PORT: enVars.PORT,
  STATE: enVars.STATE,
  DB_PASSWORD: enVars.DB_PASSWORD,
  DB_NAME: enVars.DB_NAME,
  DB_USER: enVars.DB_USER,
  DB_PORT: enVars.DB_PORT,
  DB_HOST: enVars.DB_HOST,
};
