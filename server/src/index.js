import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { productsRouter } from './routes/products.js';
import { authRouter } from './routes/auth.js';
import { cartRouter } from './routes/cart.js';
import { ordersRouter } from './routes/orders.js';
import { vouchersRouter } from './routes/vouchers.js';
import { newsletterRouter } from './routes/newsletter.js';
import { prisma } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({
  origin: ['https://birdie-1.github.io', 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      service: 'VIA ALTO Node API',
      database: 'PostgreSQL 16 (connected)',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: err.message
    });
  }
});

// Mount Routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/vouchers', vouchersRouter);
app.use('/api/newsletter', newsletterRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🏔️ VIA ALTO API Server running on http://localhost:${PORT}`);
  console.log(`🗄️ Connected to PostgreSQL database: via_alto`);
});
