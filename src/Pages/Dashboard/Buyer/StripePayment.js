import React from 'react';
import { useLoaderData } from 'react-router-dom';

const StripePayment = () => {
    const order = useLoaderData();

    console.log(order);
    return (
        <div>
            payment
        </div>
    );
};

export default StripePayment;