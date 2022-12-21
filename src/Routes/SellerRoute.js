import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { AuthContext } from '../Context/AuthProvider';


const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setRole(data?.role)
                setRoleLoading(false);
            })
            .catch(error => {
                setRoleLoading(false);
                console.log(error);
            })
    }, [user])

    if (loading || roleLoading) {
        return <div className='flex justify-center'><Spinner /></div>
    }
    if (user && user?.uid && role === 'seller') {
        return children;
    }
    return <Navigate to='/login' />

};

export default SellerRoute;