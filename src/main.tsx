import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { UserProvider } from "./contexts/UserContext";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import dayjs from 'dayjs';

dayjs.locale("pt-br");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ReactQueryProvider>
  </StrictMode>,
)
