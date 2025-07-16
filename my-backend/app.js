// app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route Imports
import userRoutes from './routes/userRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import rescueRoutes from './routes/rescueRoutes.js';
import authRoutes from './routes/authRoutes.js';
import lostAnimalRoutes from './routes/lostAnimalRoutes.js'; // ✅ ADD THIS

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from "uploads" folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/rescue', rescueRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/lost-animals', lostAnimalRoutes); // ✅ ADD THIS

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
