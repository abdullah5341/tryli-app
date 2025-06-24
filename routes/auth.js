const express = require('express');
const router = express.Router();
const axios = require('axios');

// This is a mock simplified OAuth route (for learning/testing)
router.get('/auth', async (req, res) => {
  const shop = req.query.shop;
  if (!shop) return res.send("Missing shop param");

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=read_products,read_orders&redirect_uri=${process.env.HOST}/auth/callback`;
  res.redirect(installUrl);
});

router.get('/auth/callback', async (req, res) => {
  const { shop, code } = req.query;

  if (!shop || !code) return res.status(400).send("Missing shop or code");

  const accessTokenResponse = await axios.post(`https://${shop}/admin/oauth/access_token`, {
    client_id: process.env.SHOPIFY_API_KEY,
    client_secret: process.env.SHOPIFY_API_SECRET,
    code,
  });

  const accessToken = accessTokenResponse.data.access_token;

  console.log(`Access token for ${shop}:`, accessToken);

  // Optional: Store token in memory/database here

  res.send("✅ App installed! You can now use the API.");
});

module.exports = router;
