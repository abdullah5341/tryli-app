const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Mocked inventory response, replace with Shopify Inventory API
        const inventory = [
            { item: "Hoodie", available: 8 },
            { item: "T-Shirt", available: 2 },
            { item: "Cap", available: 15 }
        ];

        const lowStock = inventory.filter(p => p.available < 10);
        res.json({ low_stock_products: lowStock });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
