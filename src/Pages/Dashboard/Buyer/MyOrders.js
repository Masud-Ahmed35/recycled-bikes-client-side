import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthProvider';

const MyOrders = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [soldProduct, setSoldProduct] = useState({});

    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/${user?.email}`)
            const data = await res.json();
            return data;
        }
    })

    // const { data: product } = useQuery({
    //     queryKey: ['paymentProducts'],
    //     queryFn: async () => {
    //         const res = await fetch(`${process.env.REACT_APP_API_URL}/paymentProducts/${soldProduct?.bookingId}`)
    //         const data = await res.json();
    //         return data;
    //     }
    // })

    const handlePayment = order => {

    }

    const handleCancelOrder = order => {
        const confirmation = window.confirm('Are you sure, You want to Cancel this product?');
        if (confirmation) {
            setLoading(true)
            fetch(`${process.env.REACT_APP_API_URL}/orders/${order?._id}`, {
                method: 'DELETE',
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
                loading || isLoading ? 'Loading.....'
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
                                                <Link to={`/dashboard/stripe-payment/${order?._id}`}>
                                                    <button
                                                        onClick={() => handlePayment(order)}
                                                        className={`btn btn-xs normal-case btn-outline btn-info ${order?.availability === 'sold' && 'btn-disabled'}`}>
                                                        {
                                                            order?.availability === 'sold' ? 'Paid'
                                                                :
                                                                'Pay Now'
                                                        }
                                                    </button>
                                                </Link>
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