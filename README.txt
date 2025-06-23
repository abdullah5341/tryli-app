# Trend Analyzer - Shopify App (Node.js)

## Features
- Shows most trending product based on sales
- Flags products that need restocking (low inventory)

## How to Run
1. Install dependencies:
   npm install

2. Set up your `.env` file with:
   - SHOPIFY_API_KEY
   - SHOPIFY_API_SECRET
   - ACCESS_TOKEN (for test use, or implement OAuth for full app)

3. Start the server:
   npm start

4. Use endpoints:
   - http://localhost:3000/api/trending-product
   - http://localhost:3000/api/low-stock
