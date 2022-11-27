import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Footer from '../Pages/Shared/Footer/Footer';
import NavBar from '../Pages/Shared/NavBar/NavBar';

const DashboardLayout = () => {
    return (
        <div>
            <NavBar />
            <div className='flex'>
                <Dashboard />
                <Outlet />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;