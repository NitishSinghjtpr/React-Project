import express from 'express';
import { config } from 'dotenv';
config();

import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/route.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());   // ✅ FIX
app.use(morgan('dev'));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use('/ping', (req, res) => {
    res.send('/pong');
});

app.use('/api/v1/user', authRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use(errorMiddleware);

export default app;
