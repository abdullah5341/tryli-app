require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ✅ Add this block to allow webcam in iframe
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors https://*.myshopify.com https://admin.shopify.com;");
  res.setHeader("Permissions-Policy", "camera=(self)");
  next();
});

// Shopify Auth Route
app.use('/auth', require('./routes/auth'));

// Serve static frontend from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Tryli App running on http://localhost:${PORT}`);
});
