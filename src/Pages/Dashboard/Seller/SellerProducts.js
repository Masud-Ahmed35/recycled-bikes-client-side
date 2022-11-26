import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const SellerProducts = () => {
    const { user } = useContext(AuthContext);

    const { data: products = [] } = useQuery({
        queryKey: ['sellerProducts'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/sellerProducts/${user?.email}`)
            const data = await res.json()
            return data;
        }
    })

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Advertisement</th>
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
                                <td>{product?.resalePrice}</td>
                                <td>{product?.availability}</td>
                                <td><button className='btn btn-xs normal-case btn-outline btn-info'>Advertise</button></td>
                                <td><button className='btn btn-xs btn-error'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerProducts;