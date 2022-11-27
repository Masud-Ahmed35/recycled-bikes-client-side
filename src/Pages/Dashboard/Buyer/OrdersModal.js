import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthProvider';

const OrdersModal = ({ handleOrder, setHandleOrder }) => {
    const { user, loading, setLoading } = useContext(AuthContext);

    const handleBooking = e => {
        e.preventDefault();
        const confirmation = window.confirm('Are you sure, You want to Book this product?');

        const order = {
            ...handleOrder,
            bookingId: handleOrder?._id,
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            buyerPhone: e.target.phone.value,
            meetingLocation: e.target.location.value,
        }
        delete order?._id

        if (confirmation) {
            setLoading(true)
            fetch(`${process.env.REACT_APP_API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success('Successfully Booked Product');
                    setLoading(false)
                    setHandleOrder(null);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false)
                })
        }
    }

    return (
        <div>
            <input type="checkbox" id="ordersModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="ordersModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-5 text-center">Your Order</h3>
                    <form onSubmit={handleBooking}>
                        <input name='productName' defaultValue={handleOrder?.productName} disabled type="text" className="input input-bordered mb-5 w-full" />
                        <input name='price' defaultValue={handleOrder?.resalePrice} disabled type="email" className="input input-bordered mb-5 w-full" />
                        <input name='name' defaultValue={user?.displayName} disabled type="text" className="input input-bordered mb-5 w-full" />
                        <input name='email' defaultValue={user?.email} disabled type="email" className="input input-bordered mb-5 w-full" />
                        <input name='phone' required type="text" placeholder="Phone Number" className="input input-bordered mb-8 w-full" />
                        <input name='location' required type="text" placeholder="Meeting Location" className="input input-bordered mb-8 w-full" />
                        <input type="submit" value="Submit" className='btn btn-accent w-full' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrdersModal;