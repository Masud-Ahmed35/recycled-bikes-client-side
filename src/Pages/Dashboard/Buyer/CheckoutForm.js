import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

const CheckoutForm = ({ order }) => {
    const [loading, setLoading] = useState(false);
    const [cardError, setCardError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
            });
    }, [order]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
        }
        else {
            setCardError('');
        }

        setSuccess('');
        setLoading(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: order?.buyerName,
                        email: order?.buyerEmail
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            const payment = {
                price: order?.resalePrice,
                transactionId: paymentIntent.id,
                email: order?.buyerEmail,
                bookingId: order?.bookingId
            }

            fetch(`${process.env.REACT_APP_API_URL}/payments`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('Congrats!!! Your payment successful');
                        setTransactionId(paymentIntent.id);
                        setLoading(false);

                        // Patch operation for sold status.........
                    }
                })
                .catch(error => {
                    toast.error(error.message)
                    setLoading(false);
                })
        }
        setLoading(false);

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='flex justify-end'>
                    <button type="submit"
                        className='mt-7 btn btn-sm btn-accent'
                        disabled={!stripe || !clientSecret || loading}>
                        Pay Now
                    </button>
                </div>
            </form>
            <p className='text-red-600'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-600 text-lg'>{success}</p>
                    <p>Your TransactionId: <span className='font-bold text-yellow-700'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;