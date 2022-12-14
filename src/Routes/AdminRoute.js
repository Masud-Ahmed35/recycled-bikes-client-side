import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import axios from "axios";
import Spinner from '../Components/Spinner';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    // -----------------Use of Axios-------------------

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/${user?.email}`)
            .then((response) => {
                console.log(response.data);
                setRoleLoading(false)
                setRole(response.data.role)
            });
    }, [user]);


    if (loading || roleLoading) {
        return <div className='flex justify-center'><Spinner /></div>
    }
    if (user && user?.uid && role === 'admin') {
        return children;
    }
    return <Navigate to='/login' />

};

export default AdminRoute;