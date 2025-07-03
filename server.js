require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// ✅ Allow JSON parsing
app.use(express.json());

// ✅ Add headers to allow webcam/microphone inside Shopify iframe
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors https://*.myshopify.com https://admin.shopify.com;");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// ✅ Shopify OAuth (if needed)
app.use('/auth', require('./routes/auth'));

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, 'dist')));

// ✅ React SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Tryli App running on http://localhost:${PORT}`);
});
