require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// ✅ Serve frontend and static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Shopify OAuth
app.use('/auth', require('./routes/auth'));

// ✅ Serve webcam.html
app.get('/webcam', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/webcam.html'));
});

// ✅ Serve tryon.html
app.get('/tryon', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/tryon.html'));
});

// ✅ Catch-all for React SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Tryli App running on http://localhost:${PORT}`);
});
