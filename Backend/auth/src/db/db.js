import mongoose from "mongoose";
import config from '../config/config.js';


/* Database connection setup */
const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to Database!");
  } catch (error) {
    console.log("Error to connect database", error);
  }
}

export default connectToDatabase;
