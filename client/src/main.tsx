import ReactDOM from 'react-dom/client';
// Import pages
import { App } from './Router';
import { BrowserRouter } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === "production") disableReactDevTools()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

);
