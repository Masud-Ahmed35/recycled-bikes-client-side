import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import Main from "../Layouts/Main";
import Blog from "../Pages/BlogPage/Blog";
import AddCategory from "../Pages/Dashboard/Admin/AddCategory";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import DisplayProducts from "../Pages/DisplayProducts/DisplayProducts";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/HomePage/Home";
import Login from "../Pages/LoginPage/Login";
import SignUp from "../Pages/LoginPage/SignUp";
import Products from "../Pages/ProductsPage/Products";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
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
                element: <SignUp />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/category/:id',
                element: <DisplayProducts />,
                loader: ({ params }) => fetch(`${process.env.REACT_APP_API_URL}/products/${params.id}`)
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '/dashboard/add-category',
                element: <AddCategory />
            },
            {
                path: '/dashboard/add-product',
                element: <AddProduct />
            },
        ]
    }
])

export default router;