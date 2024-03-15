import ReactDOM from 'react-dom/client';
import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import pages
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import SignUp from './pages/signUp';
import ViewProfile from './components/ViewProfile';

const App = (): ReactNode => {
  return (
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<MainPage />} />
        <Route path="/users/:username" element={<ViewProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <App />
  </Router>
);
