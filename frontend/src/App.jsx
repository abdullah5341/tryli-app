import { useEffect, useState } from 'react';
import { TitleBar } from '@shopify/app-bridge-react';
import './App.css';

function App() {
  const [trending, setTrending] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    fetch('/api/trending-product')
      .then(res => res.json())
      .then(data => setTrending(data.products || []))
      .catch(console.error);

    fetch('/api/low-stock')
      .then(res => res.json())
      .then(data => setLowStock(data.products || []))
      .catch(console.error);
  }, []);

  return (
    <>
      <TitleBar title="📊 Trend Analyzer Dashboard" />
      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h2>🔥 Trending Products</h2>
        <ul>
          {trending.length ? trending.map(p => (
            <li key={p.id}>{p.title}</li>
          )) : <li>Loading or none</li>}
        </ul>

        <h2 style={{ marginTop: '2rem' }}>📉 Low Stock Products</h2>
        <ul>
          {lowStock.length ? lowStock.map(p => (
            <li key={p.id}>{p.title} (Qty: {p.inventory_quantity})</li>
          )) : <li>Loading or none</li>}
        </ul>
      </div>
    </>
  );
}

export default App;
