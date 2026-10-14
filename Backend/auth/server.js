import app from './src/app.js';
import config from './src/config/config.js';
import connectToDatabase from './src/db/db.js';


/* Stablish database connection */
connectToDatabase();



app.listen(config.PORT, () => {
  console.log(`Server running on Port: ${config.PORT}`)
})
