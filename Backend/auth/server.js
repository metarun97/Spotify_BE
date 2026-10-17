import app from './src/app.js';
import config from './src/config/config.js';
import connectToDatabase from './src/db/db.js';
import { connect } from './src/broker/rabbit.js';

/* Stablish database connection */
connectToDatabase();


/* Stablish RabbitMq connection */
connect();

/* Auth server started */
app.listen(config.PORT, () => {
  console.log(`Auth server running on Port: ${config.PORT}`)
})


