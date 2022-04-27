import { ProcessEnv } from "../types/environment";
import dotenv from "dotenv";

dotenv.config()

const ENV = (process.env as unknown) as ProcessEnv;

export const {
  NODE_ENV,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_ROOT_PASSWORD,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,

  DATA_FILE_PATH,
} = ENV;
