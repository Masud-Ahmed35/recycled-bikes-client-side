import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthProvider';

const MyOrders = () => {
    const { user, loading, setLoading } = useContext(AuthContext);


    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/${user?.email}`)
            const data = await res.json();
            return data;
        }
    })

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
    if (isLoading) {
        <p>Loading..........</p>
    }

    return (
        <div>
            {
                orders?.length > 0 ?
                    <>
                        {
                            loading ? <p>Loading...........</p>
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
                                                    <th>Advertisement</th>
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
                                                            <button
                                                                onClick={() => handlePayment(order)}
                                                                className='btn btn-xs normal-case btn-outline btn-info'>Pay Now
                                                            </button>
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
                    </>
                    :
                    <>
                        <h1 className='text-center font-bold text-3xl mt-7'>There is no product added till now</h1>
                    </>
            }
        </div>
    );
};

export default MyOrders;