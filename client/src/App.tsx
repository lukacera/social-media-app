import React, { ReactNode } from "react"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from "./pages/MainPage"
const App = (): ReactNode => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage />
        },
        {
            path: "/allProfiles",
            element: <MainPage />
        }
    ])
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
};

export default App;
