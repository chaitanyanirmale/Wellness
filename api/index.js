import { log } from "console";
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import sessionRouter from './routes/session.route.js'

dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const app = express();

app.use(express.json())

app.use(cookieParser())

app.listen(3000, () => {
    console.log("server is running on port 3000");
})

app.use("/api/user", userRouter);
app.use('/api/auth', authRouter);
app.use('/api/session', sessionRouter);


app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})