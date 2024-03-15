import ReactDOM from 'react-dom/client';
// Import pages
import { App } from './Router';
import React from 'react';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

);
