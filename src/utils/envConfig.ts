import dotenv from 'dotenv';
import { cleanEnv, host, port, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  // General
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  HOST: host({ default: 'localhost' }),
  PORT: port({ default: 8081 }),
  CORS_ORIGIN: str({ default: 'http://localhost:8081' }),
  GITHUB_API_URL: str({ default: 'https://api.github.com/search' }),
});
