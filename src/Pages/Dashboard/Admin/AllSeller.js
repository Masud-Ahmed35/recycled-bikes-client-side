import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const AllSeller = () => {
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['allSeller'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/allSeller`)
            const data = await res.json()
            return data;
        }
    })

    const handleDeleteProduct = seller => {
        const confirmation = window.confirm('Are you sure, You want to delete?');

        if (confirmation) {
            fetch(`${process.env.REACT_APP_API_URL}/allSeller/${seller?._id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    refetch();
                    toast.success('Deleted Successfully');
                })
        }
    }

    const handleVerification = seller => {
        const confirmation = window.confirm('Are you sure, You want to Verify?');

        const data = {
            verification: 'verified'
        }
        if (confirmation) {
            fetch(`${process.env.REACT_APP_API_URL}/allSeller/${seller?._id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    refetch();
                    toast.success('Seller Verification Successful');
                })
        }
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Identification</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, i) => <tr key={seller?._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-16 rounded-xl">
                                            <img src={seller?.image} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td><p>{seller?.name}</p></td>
                                <td><p>
                                    {seller?.verification ? <button className='btn btn-xs btn-primary btn-disabled text-green-600'>Verified</button>
                                        :
                                        <button
                                            onClick={() => handleVerification(seller)}
                                            className='btn btn-xs normal-case btn-warning'>
                                            Not Verified
                                        </button>
                                    }
                                </p></td>
                                <td><button
                                    onClick={() => handleDeleteProduct(seller)}
                                    className='btn btn-xs btn-error'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;