import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../../Components/Spinner';
import { AuthContext } from '../../../Context/AuthProvider';

const SellerProducts = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/sellerProducts/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })

    }, [user, refresh, setLoading])

    const handleAdvertise = product => {
        const confirmation = window.confirm('Are you sure, You want to advertise?');

        if (confirmation) {
            setLoading(true)
            const advertisedProduct = { ...product, advertiseId: product?._id }
            delete advertisedProduct._id
            fetch(`${process.env.REACT_APP_API_URL}/advertise`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(advertisedProduct)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success('Advertisement Successfully Done');
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                })
        }
    }

    const handleDeleteProduct = product => {
        const confirmation = window.confirm('Are you sure, You want to delete?');

        if (confirmation) {
            fetch(`${process.env.REACT_APP_API_URL}/products/${product?._id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    setRefresh(!refresh);
                    toast.success('Deleted Successfully');
                })
        }
    }

    return (
        <div>
            {
                loading ? <div className='flex justify-center'><Spinner /></div>
                    :
                    <>
                        {
                            products?.length > 0 ?
                                <>
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
                                                        <td>
                                                            {
                                                                product.availability === 'sold' ?
                                                                    <p className='text-sm font-bold'>Already Sold</p>
                                                                    :
                                                                    <Link to='/'>
                                                                        <button
                                                                            onClick={() => handleAdvertise(product)}
                                                                            className='btn btn-xs normal-case btn-outline btn-info'>Advertise
                                                                        </button>
                                                                    </Link>
                                                            }
                                                        </td>
                                                        <td><button
                                                            onClick={() => handleDeleteProduct(product)}
                                                            className='btn btn-xs btn-error'>Delete</button></td>
                                                    </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                                :
                                <>
                                    <h1 className='text-center font-bold text-3xl mt-7'>There is no product added till now</h1>
                                </>
                        }
                    </>
            }
        </div>
    );
};

export default SellerProducts;