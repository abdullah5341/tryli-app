router.get('/auth', async (req, res) => {
  console.log("✅ /auth route HIT with query:", req.query);  // add this
  const shop = req.query.shop;
  if (!shop) return res.send("Missing shop param");

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=read_products,read_orders&redirect_uri=${process.env.HOST}/auth/callback`;
  res.redirect(installUrl);
});
