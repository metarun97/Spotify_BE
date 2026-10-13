import { config as dotenvConfig } from "dotenv";


dotenvConfig();

/* Credetials of server */
const _config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
}

export default Object.freeze(_config);
