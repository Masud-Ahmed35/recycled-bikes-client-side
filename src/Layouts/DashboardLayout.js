import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Pages/Shared/NavBar/NavBar';

const DashboardLayout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default DashboardLayout;