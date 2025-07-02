require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Shopify Auth Route
app.use('/auth', require('./routes/auth')); // Shopify OAuth

// (Optional: Later you can add try-on specific routes here)
// e.g., app.use('/api/virtual-try', require('./routes/tryon'))

// Serve static frontend from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes by serving index.html (for React Router SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Tryli App running on http://localhost:${PORT}`);
});
