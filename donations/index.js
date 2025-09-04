/**
 * Armario Solidario - Donations Module
 * Real donations processing with PayPal/Stripe integration
 * PDF receipt generation and email notifications
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const donationRoutes = require('./routes/donations');
const { initializeDatabase } = require('./utils/database');

const app = express();
const PORT = process.env.PORT || 3002;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (receipts, assets)
app.use('/receipts', express.static(path.join(__dirname, 'receipts')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Armario Solidario Donations',
    version: '1.0.0'
  });
});

// Donation routes
app.use('/api/donations', donationRoutes);

// Donation landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'donation-page.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Donation API Error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong with donation processing'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Donation endpoint not found'
  });
});

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    console.log('✅ Database initialized');
    
    app.listen(PORT, () => {
      console.log(`🚀 Armario Solidario Donations API running on port ${PORT}`);
      console.log(`💝 Donation page: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;