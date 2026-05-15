require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/badges', badgeRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Démarrage
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  try {
    await prisma.$connect();
    console.log('📊 PostgreSQL connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
});