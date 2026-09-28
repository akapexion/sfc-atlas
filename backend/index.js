import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import marketRoutes from './routes/marketRoutes.js';
import preOrderRoutes from './routes/preOrderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

/**
 * High-Traffic Process Fail-Safe Handlers:
 * Prevents Node.js server from exiting on unexpected uncaught exceptions or promise rejections.
 */
process.on('uncaughtException', (err) => {
  console.error('CRITICAL SERVER UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('CRITICAL UNHANDLED REJECTION AT:', promise, 'REASON:', reason);
});

// Connect to MongoDB Local instance
connectDB();

const app = express();

// Global Middleware Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. Postman, curl) or from allowed list
    if (!origin || allowedOrigins.includes(origin) || (process.env.FRONTEND_URL && origin.endsWith('.vercel.app'))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Route Handlers
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/markets', marketRoutes);
app.use('/api/orders', preOrderRoutes);
app.use('/api/reviews', reviewRoutes);

// Health Check Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'MarketLink API Server Running', status: 'Active', uptime: process.uptime() });
});

// Global Express Error Catch Middleware (Prevents server crashes on bad requests)
app.use((err, req, res, next) => {
  console.error('Express Global Error Catch:', err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend Express Server started on http://localhost:${PORT}`);
});