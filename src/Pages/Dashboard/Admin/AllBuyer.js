import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const AllBuyer = () => {
    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['allBuyer'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/allBuyer`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data;
        }
    })

    const handleDeleteProduct = buyer => {
        const confirmation = window.confirm('Are you sure, You want to delete?');

        if (confirmation) {
            fetch(`${process.env.REACT_APP_API_URL}/allBuyer/${buyer?._id}`, {
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
                            buyers.map((buyer, i) => <tr key={buyer?._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-16 rounded-xl">
                                            <img src={buyer?.image} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p>{buyer?.name}</p>
                                </td>
                                <td><button
                                    onClick={() => handleDeleteProduct(buyer)}
                                    className='btn btn-xs btn-error'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyer;