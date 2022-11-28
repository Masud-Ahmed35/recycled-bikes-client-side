import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import Main from "../Layouts/Main";
import Blog from "../Pages/BlogPage/Blog";
import AddCategory from "../Pages/Dashboard/Admin/AddCategory";
import AllBuyer from "../Pages/Dashboard/Admin/AllBuyer";
import AllSeller from "../Pages/Dashboard/Admin/AllSeller";
import ReportedProducts from "../Pages/Dashboard/Admin/ReportedProducts";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders";
import StripePayment from "../Pages/Dashboard/Buyer/StripePayment";
import Wishlist from "../Pages/Dashboard/Buyer/Wishlist";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import SellerProducts from "../Pages/Dashboard/Seller/SellerProducts";
import DisplayProducts from "../Pages/DisplayProducts/DisplayProducts";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/HomePage/Home";
import Login from "../Pages/LoginPage/Login";
import SignUp from "../Pages/LoginPage/SignUp";
import Products from "../Pages/ProductsPage/Products";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import SellerRoute from "./SellerRoute";

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
                element: <BuyerRoute><DisplayProducts /></BuyerRoute>,
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
                element: <AdminRoute><AddCategory /></AdminRoute>
            },
            {
                path: '/dashboard/all-buyer',
                element: <AdminRoute><AllBuyer /></AdminRoute>
            },
            {
                path: '/dashboard/all-seller',
                element: <AdminRoute><AllSeller /></AdminRoute>
            },
            {
                path: '/dashboard/reported-products',
                element: <AdminRoute><ReportedProducts /></AdminRoute>
            },
            {
                path: '/dashboard/add-product',
                element: <SellerRoute><AddProduct /></SellerRoute>
            },
            {
                path: '/dashboard/seller-products',
                element: <SellerRoute><SellerProducts /></SellerRoute>
            },
            {
                path: '/dashboard/my-orders',
                element: <BuyerRoute><MyOrders /></BuyerRoute>
            },
            {
                path: '/dashboard/wishlist',
                element: <Wishlist />
            },
            {
                path: '/dashboard/stripe-payment/:id',
                element: <BuyerRoute><StripePayment /></BuyerRoute>,
                loader: ({ params }) => fetch(`${process.env.REACT_APP_API_URL}/paymentOrders/${params.id}`)
            },

        ]
    }
])

export default router;