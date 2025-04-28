import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.tsx'
const key = 'pk_test_YWN0dWFsLXR1bmEtNy5jbGVyay5hY2NvdW50cy5kZXYk';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ClerkProvider publishableKey={key}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
