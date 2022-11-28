import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';


const BuyerRoute = ({ children }) => {
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
        return <h1>Loading.....</h1>
    }
    if (user && user?.uid && role === 'buyer') {
        return children;
    }
    return <Navigate to='/login' />

};

export default BuyerRoute;