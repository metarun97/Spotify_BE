import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';
import cors from "cors";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import config from '../src/config/config.js';


/* Server created */
const app = express();

/* cors policy setup */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

/* Middleware to track server activity */
app.use(morgan("dev"));

/* Middleware to read req.body data */
app.use(express.json());

/* Middleware to read cookie data */
app.use(cookieParser());

/* Configure Passport to use Google OAuth 2.0 strategy */
passport.use(new GoogleStrategy({
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Here, you would typically find or create a user in your database
  // For this example, we'll just return the profile
  return done(null, profile);
}));


/* AUTH routes with it's prefix */
app.use("/api/auth", authRoutes);


export default app;
