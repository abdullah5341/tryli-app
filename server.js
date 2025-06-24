require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/trending-product', require('./routes/trending'));
app.use('/api/low-stock', require('./routes/restock'));
app.use('/', require('./routes/auth')); // 🔥 ADD THIS LINE

// Optional Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Only one app.listen
app.listen(PORT, () => {
  console.log(`✅ App running on http://localhost:${PORT}`);
});
