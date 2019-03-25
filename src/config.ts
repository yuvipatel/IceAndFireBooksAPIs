// load configs from .env file
import dotEnv from 'dotenv-safe';

// uncomment comment inside load method, if we want to allow empty environment variables
dotEnv.load({
  // allowEmptyValues: true
});

/**
 * Config class with all app configs
 */
const Config = {
  ENV: process.env.ENV,
  PORT: process.env.APP_PORT,
  DB_URL: process.env.NODE_ENV === 'test' ? process.env.DB_URL_TEST : process.env.DB_URL
};

export default Config;
