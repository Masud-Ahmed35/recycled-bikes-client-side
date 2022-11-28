import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const ReportedProducts = () => {
    const { data: products = [], refetch } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/reportedProducts`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data;
        }
    })

    const handleDeleteProduct = product => {
        const confirmation = window.confirm('Are you sure, You want to delete Reported Product?');

        if (confirmation) {
            fetch(`${process.env.REACT_APP_API_URL}/products/${product?._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    refetch();
                    toast.success('Deleted Successfully');
                })
        }
    }

    return (
        <div>
            {
                products?.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product, i) => <tr key={product?._id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="avatar">
                                                <div className="w-16 rounded-xl">
                                                    <img src={product?.productImage} alt='' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{product?.productName}</p>
                                        </td>
                                        <td><button
                                            onClick={() => handleDeleteProduct(product)}
                                            className='btn btn-xs btn-error'>Delete</button></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='text-center font-bold mt-11 text-5xl'>
                        <h1>There is no Reported Product.</h1>
                    </div>
            }
        </div>
    );
};

export default ReportedProducts;