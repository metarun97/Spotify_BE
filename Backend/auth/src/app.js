import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';
import cors from "cors";

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

/* AUTH routes with it's prefix */
app.use("/api/auth", authRoutes);


export default app;
