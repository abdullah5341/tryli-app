import React from 'react';
import ReactDOM from 'react-dom/client';
import TryOnPage from './components/TryOnPage';
import './index.css'; // Optional: include if you want base styling

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <TryOnPage />
  </React.StrictMode>
);
