require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/trending-product', require('./routes/trending'));
app.use('/api/low-stock', require('./routes/restock'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
