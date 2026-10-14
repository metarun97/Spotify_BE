import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';


/* Server created */
const app = express();

/* Middleware to track server activity */
app.use(morgan("dev"));

/* Middleware to read req.body data */
app.use(express.json());

/* Middleware to read cookie data */
app.use(cookieParser());

/* AUTH routes with it's prefix */
app.use("/api/auth", authRoutes);


export default app;
