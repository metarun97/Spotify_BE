import app from './src/app.js';
import config from './src/config/config.js';



/* Notification server started */
app.listen(config.PORT, () => {
  console.log(`Notification server running on Port: ${config.PORT}`)
})
