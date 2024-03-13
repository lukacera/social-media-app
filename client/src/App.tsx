import React, { ReactNode } from "react"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Import pages
import MainPage from "./pages/MainPage"
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import SignUp from "./pages/signUp";

const App = (): ReactNode => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage />
        },
        {
            path: "/profiles",
            element: <MainPage />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/signUp",
            element: <SignUp />
        },
        { path: "*", element: <ErrorPage /> }
    ])
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
};

export default App;
