import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../../Components/Spinner';
import { AuthContext } from '../../../Context/AuthProvider';

const MyOrders = () => {
    const { user, loading, setLoading } = useContext(AuthContext);

    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    const handleCancelOrder = order => {
        const confirmation = window.confirm('Are you sure, You want to Cancel this product?');
        if (confirmation) {
            setLoading(true)
            fetch(`${process.env.REACT_APP_API_URL}/orders/${order?._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    toast.success('Order Canceled Successfully');
                    setLoading(false)
                    refetch();
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false)
                })
        }
    }

    return (
        <div>
            {
                loading || isLoading ? <Spinner />
                    :
                    <>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Payment</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order, i) => <tr key={order?._id}>
                                            <th>{i + 1}</th>
                                            <td>
                                                <div className="avatar">
                                                    <div className="w-16 rounded-xl">
                                                        <img src={order?.productImage} alt='' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p>{order?.productName}</p>
                                            </td>
                                            <td>{order?.resalePrice}</td>
                                            <td>{order?.availability}</td>
                                            <td>
                                                {
                                                    order?.availability === 'sold' ?
                                                        <p className='font-medium text-green-500'>PAID</p>
                                                        :
                                                        <Link to={`/dashboard/stripe-payment/${order?._id}`}>
                                                            <button
                                                                className={`btn btn-xs normal-case btn-outline btn-info`}>
                                                                Pay Now
                                                            </button>
                                                        </Link>
                                                }
                                            </td>
                                            <td><button
                                                onClick={() => handleCancelOrder(order)}
                                                className='btn btn-xs btn-error'>Cancel</button></td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
            }
        </div>
    );
};

export default MyOrders;