import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../Components/Spinner';
import { AuthContext } from '../../Context/AuthProvider';

const Dashboard = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const [role, setRole] = useState('');

    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/users/${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setRole(data.role);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })

    }, [user, setLoading])

    return (
        <div>
            <div className="flex flex-col w-64 py-8 border-r">
                <p className='text-center uppercase text-sm font-bold italic font-serif'>{`${role} Dashboard`}</p>
                <div className="flex flex-col items-center mt-6 -mx-2">
                    <img className="object-cover w-24 h-24 mx-2 rounded-full" src={user?.photoURL} alt="avatar" />
                    <h4 className="mx-2 mt-2 font-medium text-gray-800 hover:underline">{user?.displayName}</h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-gray-600 hover:underline">{user?.email}</p>
                </div>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        {
                            role === 'admin' || role === 'seller' ?
                                <div>
                                    {
                                        role === 'admin' ?
                                            <div className='mt-5'>
                                                <Link to='/dashboard/add-category'>
                                                    <button className="btn btn-outline text-base font-bold normal-case w-[90%] mx-auto">Add a Category</button>
                                                </Link>
                                                <Link to='/dashboard/all-seller'>
                                                    <button className="btn btn-outline text-base mt-5 font-bold normal-case w-[90%] mx-auto">All Seller</button>
                                                </Link>
                                                <Link to='/dashboard/all-buyer'>
                                                    <button className="btn btn-outline text-base my-5 font-bold normal-case w-[90%] mx-auto">All Buyer</button>
                                                </Link>
                                                <Link to='/dashboard/reported-products'>
                                                    <button className="btn btn-outline text-base font-bold normal-case w-[90%] mx-auto">Reported Products</button>
                                                </Link>
                                            </div>
                                            :
                                            <div className='mt-5'>
                                                <Link to='/dashboard/add-product'>
                                                    <button className="btn btn-outline text-base font-bold normal-case w-[90%] mx-auto">Add a Product</button>
                                                </Link>
                                                <Link to='/dashboard/seller-products'>
                                                    <button className="btn btn-outline text-base my-5 font-bold normal-case w-[90%] mx-auto">My Products</button>
                                                </Link>
                                                <Link>
                                                    <button className="btn btn-outline text-base font-bold normal-case w-[90%] mx-auto">My Buyers</button>
                                                </Link>
                                            </div>
                                    }
                                </div>
                                :
                                <div className='mt-5'>
                                    <Link to='/dashboard/my-orders'>
                                        <button className="btn btn-outline text-base font-bold normal-case w-[90%] mx-auto">My Orders</button>
                                    </Link>
                                    <Link to='/dashboard/wishlist'>
                                        <button className="btn btn-outline mt-5 text-base font-bold normal-case w-[90%] mx-auto">Wishlist</button>
                                    </Link>
                                </div>
                        }
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;