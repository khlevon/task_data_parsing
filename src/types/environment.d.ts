export interface ProcessEnv {
  // [key: string]: any;
  NODE_ENV: "development" | "production" | "test" | "staging";

  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_ROOT_PASSWORD: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;

  DATA_FILE_PATH: string;
  LOG_LEVEL: string;
}
