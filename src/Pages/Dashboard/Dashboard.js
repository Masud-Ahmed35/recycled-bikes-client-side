import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Dashboard = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const [role, setRole] = useState('');

    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setRole(data.role);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })

    }, [user])

    return (
        <div>
            <div className="flex flex-col w-64 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
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
                                                <Link>
                                                    <button className="btn btn-outline text-base mt-5 font-bold normal-case w-[90%] mx-auto">All Seller</button>
                                                </Link>
                                                <Link>
                                                    <button className="btn btn-outline text-base my-5 font-bold normal-case w-[90%] mx-auto">All Buyer</button>
                                                </Link>
                                                <Link>
                                                    <button className="btn btn-outline text-base font-bold normal-case w-[90%] mx-auto">Reported Items</button>
                                                </Link>
                                            </div>
                                            :
                                            <div className='mt-5'>
                                                <Link to='/dashboard/add-product'>
                                                    <button className="btn btn-outline text-base font-bold normal-case w-[90%] mx-auto">Add a Product</button>
                                                </Link>
                                                <Link>
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
                                    <Link>
                                        <button className="btn btn-outline text-base font-bold normal-case w-[90%] mx-auto">My Orders</button>
                                    </Link>
                                </div>
                        }
                    </nav>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Dashboard;