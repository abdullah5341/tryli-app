const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Mocked response, replace with Shopify Orders API
        const orders = [
            { line_items: [{ title: "Hoodie", quantity: 3 }] },
            { line_items: [{ title: "T-Shirt", quantity: 5 }, { title: "Hoodie", quantity: 2 }] }
        ];

        const productCount = {};
        for (let order of orders) {
            for (let item of order.line_items) {
                const title = item.title;
                productCount[title] = (productCount[title] || 0) + item.quantity;
            }
        }

        const trending = Object.entries(productCount).sort((a, b) => b[1] - a[1])[0];
        res.json({ trending_product: trending[0], quantity_sold: trending[1] });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
