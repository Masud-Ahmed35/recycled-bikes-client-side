import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';
import ProductCard from './ProductCard';

const DisplayProducts = () => {
    const products = useLoaderData();
    const { user } = useContext(AuthContext);

    const { data: sellerInfo = {} } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${user?.email}`)
            const data = await res.json()
            return data;
        }
    })

    const handleReport = product => {
        const confirmation = window.confirm('Are you sure, You want to report to admin?');

        const data = {
            report: 'reported'
        }
        if (confirmation) {
            fetch(`${process.env.REACT_APP_API_URL}/products/${product?._id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success('Successfully Reported to Admin');
                })
        }
    }

    return (
        <div className='mt-7'>
            <h1 className='text-center font-extrabold text-3xl italic mb-11'>Choose Your Dream Bike</h1>
            <div>
                {
                    products?.length > 0 ?
                        <div className='grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                            {
                                products?.map(product => <ProductCard
                                    key={product._id}
                                    product={product}
                                    sellerInfo={sellerInfo}
                                    handleReport={handleReport}
                                ></ProductCard>)
                            }
                        </div>
                        :
                        <div className='flex justify-center items-center text-3xl font-extrabold text-amber-700'>
                            <h1>No Products Available for this Category</h1>
                        </div>
                }
            </div>
        </div>
    );
};

export default DisplayProducts;