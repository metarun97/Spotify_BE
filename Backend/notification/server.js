import app from './src/app.js';
import config from './src/config/config.js';
import { connect } from './src/broker/rabbit.js';
import startListener from './src/broker/listener.js';


/* Connect to RabbitMQ */
connect().then(startListener);

/* Notification server started */
app.listen(config.PORT, () => {
  console.log(`Notification server running on Port: ${config.PORT}`)
})
