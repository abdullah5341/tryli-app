import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';

const config = {
  apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
  host: new URLSearchParams(window.location.search).get("host"),
  forceRedirect: true,
};

ReactDOM.render(
  <React.StrictMode>
    <AppBridgeProvider config={config}>
      <App />
    </AppBridgeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
