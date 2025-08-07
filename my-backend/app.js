// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import volunteerRoutes from './routes/volunteerRoutes.js';

dotenv.config();

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// ✅ CORS setup for frontend at 127.0.0.1:5173
app.use(
  cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true, // allow cookies and headers with credentials
  })
);

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/volunteers', volunteerRoutes);

// ✅ Root
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
