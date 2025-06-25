import { TitleBar } from '@shopify/app-bridge-react'
import './App.css'

function App() {
  return (
    <>
      <TitleBar title="📊 Trend Analyzer Dashboard" />
      <div style={{ padding: '2rem' }}>
        <h2>🔥 Trending Products</h2>
        <a href="https://trend-analyzer-production.up.railway.app/api/trending-product" target="_blank">
          View Trending Products
        </a>

        <h2 style={{ marginTop: '40px' }}>📉 Low Stock Products</h2>
        <a href="https://trend-analyzer-production.up.railway.app/api/low-stock" target="_blank">
          View Low Stock Items
        </a>
      </div>
    </>
  )
}

export default App
