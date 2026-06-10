import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './configure-pro-av-tool-mock.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
