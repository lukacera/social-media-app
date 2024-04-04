import ReactDOM from 'react-dom/client';
// Import pages
import { App } from './Router';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './hooks/UserContextHook';
import { Analytics } from "@vercel/analytics/react"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <UserProvider>
      <App />
      < Analytics />
    </UserProvider>
  </BrowserRouter>

);
