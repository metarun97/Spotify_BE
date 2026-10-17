import { config as dotenvConfig } from "dotenv";


dotenvConfig();

/* Credetials of server */
const _config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  RABBITMQ_URI: process.env.RABBITMQ_URI,
}

export default Object.freeze(_config);
