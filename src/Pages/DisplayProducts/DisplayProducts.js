import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard';

const DisplayProducts = () => {
    const products = useLoaderData();

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