import ReactDOM from 'react-dom/client';
// Import pages
import { App } from './Router';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './hooks/UserContextHook';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>

);
