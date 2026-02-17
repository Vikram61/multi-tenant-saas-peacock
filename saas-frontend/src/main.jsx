import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/theme.css'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LayoutProvider } from './context/LayoutContext.jsx'
import { UpgradeProvider } from './context/UpgradeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UpgradeProvider>
      <ThemeProvider>
        <LayoutProvider>
             <App />
        </LayoutProvider>
      </ThemeProvider>
      </UpgradeProvider>
      
    </BrowserRouter>
  </StrictMode>,
)
