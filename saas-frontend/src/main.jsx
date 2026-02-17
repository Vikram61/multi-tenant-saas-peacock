import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/theme.css'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LayoutProvider } from './context/LayoutContext.jsx'
import { refreshAccessToken } from './api/refresh.js'
import { setupInterceptors } from './api/setupInterceptors.js'
import { AuthProvider } from './context/AuthContext.jsx'
import { UpgradeProvider } from './context/UpgradeContext.jsx'
await refreshAccessToken();
setupInterceptors();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <UpgradeProvider>
      <ThemeProvider>
        <LayoutProvider>
             <App />
        </LayoutProvider>
      </ThemeProvider>
      </UpgradeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
