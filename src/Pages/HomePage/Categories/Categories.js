import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Category from './Category';

const Categories = () => {

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`)
            const data = await res.json()
            return data;
        }
    })

    return (
        <div className='mt-12'>
            <h1 className='text-3xl font-bold'>Product Categories</h1>
            <div className='flex gap-4 flex-wrap mt-5'>
                {
                    categories.map(category => <Category
                        key={category?._id}
                        category={category}
                    ></Category>)
                }
            </div>
        </div>
    );
};

export default Categories;