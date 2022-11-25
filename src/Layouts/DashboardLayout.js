import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import NavBar from '../Pages/Shared/NavBar/NavBar';

const DashboardLayout = () => {
    return (
        <div>
            <NavBar />
            <div className='flex'>
                <Dashboard />
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;