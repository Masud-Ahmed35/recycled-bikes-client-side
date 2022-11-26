import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertiseCard from './AdvertiseCard';

const AdvertiseProducts = () => {

    const { data: products = [] } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/advertise`)
            const data = await res.json();
            return data;
        }
    })

    console.log(products);

    return (
        <div className='mt-11'>
            <h1 className='text-center text-4xl font-bold'>Advertisement Area</h1>
            <div>
                {
                    products?.length > 0 ?
                        <div className='grid gap-7 mt-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                            {
                                products?.map(product => <AdvertiseCard
                                    key={product._id}
                                    product={product}
                                ></AdvertiseCard>)
                            }
                        </div>
                        :
                        <div className='flex justify-center items-center text-3xl font-extrabold text-amber-700'>
                            <h1>Nothing is for Advertisement</h1>
                        </div>
                }
            </div>
        </div>
    );
};

export default AdvertiseProducts;