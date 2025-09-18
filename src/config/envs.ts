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
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
  CLOUD_DINARY_NAME: string;
  CLOUD_DINARY_API_KEY: string;
  CLOUD_DINARY_API_SECRET: string;
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
    FIREBASE_PROJECT_ID: joi.string().required(),
    FIREBASE_CLIENT_EMAIL: joi.string().required(),
    FIREBASE_PRIVATE_KEY: joi.string().required(),
    CLOUD_DINARY_NAME: joi.string().required(),
    CLOUD_DINARY_API_KEY: joi.string().required(),
    CLOUD_DINARY_API_SECRET: joi.string().required(),
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
  FIREBASE_PROJECT_ID: enVars.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: enVars.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: enVars.FIREBASE_PRIVATE_KEY,
  CLOUD_DINARY_NAME: enVars.CLOUD_DINARY_NAME,
  CLOUD_DINARY_API_KEY: enVars.CLOUD_DINARY_API_KEY,
  CLOUD_DINARY_API_SECRET: enVars.CLOUD_DINARY_API_SECRET,
};
