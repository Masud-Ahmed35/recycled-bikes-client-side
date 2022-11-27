import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const StripePayment = () => {
    const order = useLoaderData();

    return (
        <div className='ml-5'>
            <div>
                <h1 className='text-2xl font-bold'>Please pay for your order: <span className='text-gray-500 italic font-mono'>{order?.productName}</span></h1>
                <p className='font-semibold text-lg'>Total Price: <span className='text-amber-600 font-extrabold font-serif text-2xl'>${order?.resalePrice}</span></p>
            </div>
            <div className='mt-11'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm order={order} />
                </Elements>
            </div>
        </div>
    );
};

export default StripePayment;