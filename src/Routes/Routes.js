import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Blog from "../Pages/BlogPage/Blog";
import Home from "../Pages/HomePage/Home";
import Login from "../Pages/LoginPage/Login";
import Logout from "../Pages/LoginPage/Logout";
import Products from "../Pages/ProductsPage/Products";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Logout />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/blog',
                element: <Blog />
            },
        ]
    }
])

export default router;