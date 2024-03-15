import MainPage from './pages/MainPage';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import SignUp from './pages/signUp';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/users" element={<MainPage />} />
                <Route path="/users/:username" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};

