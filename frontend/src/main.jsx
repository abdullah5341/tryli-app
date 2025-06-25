import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react'

const config = {
  apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
  host: new URLSearchParams(window.location.search).get("host"),
  forceRedirect: true,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppBridgeProvider config={config}>
      <App />
    </AppBridgeProvider>
  </StrictMode>
)
