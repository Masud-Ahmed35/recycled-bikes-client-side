import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertiseCard from './AdvertiseCard';

const AdvertiseProducts = () => {

    const { data: products = [] } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/advertise`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className={`mt-11 ${products?.length < 1 && 'hidden'}`}>
            <h1 className='text-center text-4xl font-bold'>Advertisement Area</h1>
            <div>
                {
                    products?.length > 0 &&
                    <div className='grid gap-7 mt-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {
                            products?.map(product => <AdvertiseCard
                                key={product._id}
                                product={product}
                            ></AdvertiseCard>)
                        }
                    </div>

                }
            </div>
        </div>
    );
};

export default AdvertiseProducts;