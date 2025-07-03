const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public'))); // ✅ serve public folder

// Shopify OAuth
app.use('/auth', require('./routes/auth'));

// Serve external camera page
app.get('/capture', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/capture.html'));
});

// Catch-all (for React SPA in dist)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Tryli App running on http://localhost:${PORT}`);
});
