const express = require('express');
const router = express.Router();
const axios = require('axios');

// OAuth install step
router.get('/auth', async (req, res) => {
  console.log("✅ /auth route HIT");
  const shop = req.query.shop;
  if (!shop) return res.send("Missing shop param");

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=read_products,read_orders&redirect_uri=${process.env.HOST}/auth/callback`;
  res.redirect(installUrl);
});

// OAuth callback step
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

  // ✅ Redirect to embedded app inside Shopify Admin
  res.redirect(`https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`);
});

module.exports = router;
