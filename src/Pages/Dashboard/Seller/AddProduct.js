import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { getField } from '../../../Api/utilities';
import { AuthContext } from '../../../Context/AuthProvider';

const AddProduct = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`)
            const data = await res.json()
            return data;
        }
    })
    // const categoryName = getField(categories, 'categoryName');

    const handleAddProduct = data => {
        console.log(data);
    }

    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md">
                <h2 className="text-xl font-bold mb-7 text-center text-gray-700">Add a Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <select
                        {...register("categoryId", {
                            required: 'Please Select a Category'
                        })}
                        aria-invalid={errors?.categoryId ? 'true' : 'false'}
                        className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Please Select a Category</option>
                        {
                            categories.map((category) => <option
                                key={category._id}
                                value={category._id}
                            >{category.categoryName}</option>)
                        }
                    </select>
                    <div className="mt-1 text-right">{errors?.categoryId && <p className='text-red-600 text-sm'>{errors?.categoryId?.message}</p>}</div>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <div>
                                <input placeholder='Product Name'
                                    type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    {...register("productName", {
                                        required: 'required'
                                    })}
                                    aria-invalid={errors?.productName ? 'true' : 'false'}
                                />
                            </div>
                            <div className="mt-1 text-right">{errors?.productName && <p className='text-red-600 text-sm'>{errors?.productName?.message}</p>}</div>
                        </div>
                        <div>
                            <div>
                                <input type="file" className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    {...register("productImage", {
                                        required: 'required'
                                    })}
                                    aria-invalid={errors?.productImage ? 'true' : 'false'}
                                />
                            </div>
                            <div className="mt-1 text-right">{errors?.productImage && <p className='text-red-600 text-sm'>{errors?.productImage?.message}</p>}</div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Resale Price'
                                    type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    {...register("resalePrice", {
                                        required: 'required'
                                    })}
                                    aria-invalid={errors?.resalePrice ? 'true' : 'false'}
                                />
                            </div>
                            <div className="mt-1 text-right">{errors?.resalePrice && <p className='text-red-600 text-sm'>{errors?.resalePrice?.message}</p>}</div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Original Price'
                                    type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    {...register("originalPrice", {
                                        required: 'required'
                                    })}
                                    aria-invalid={errors?.originalPrice ? 'true' : 'false'}
                                />
                            </div>
                            <div className="mt-1 text-right">{errors?.originalPrice && <p className='text-red-600 text-sm'>{errors?.originalPrice?.message}</p>}</div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Purchase Year'
                                    type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    {...register("purchaseYear", {
                                        required: 'required'
                                    })}
                                    aria-invalid={errors?.purchaseYear ? 'true' : 'false'}
                                />
                            </div>
                            <div className="mt-1 text-right">{errors?.purchaseYear && <p className='text-red-600 text-sm'>{errors?.purchaseYear?.message}</p>}</div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Years of Use'
                                    type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    {...register("yearsOfUse", {
                                        required: 'required'
                                    })}
                                    aria-invalid={errors?.yearsOfUse ? 'true' : 'false'}
                                />
                            </div>
                            <div className="mt-1 text-right">{errors?.yearsOfUse && <p className='text-red-600 text-sm'>{errors?.yearsOfUse?.message}</p>}</div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Condition'
                                    type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    {...register("condition", {
                                        required: 'required'
                                    })}
                                    aria-invalid={errors?.condition ? 'true' : 'false'}
                                />
                            </div>
                            <div className="mt-1 text-right">{errors?.condition && <p className='text-red-600 text-sm'>{errors?.condition?.message}</p>}</div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Location'
                                    type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    {...register("location", {
                                        required: 'required'
                                    })}
                                    aria-invalid={errors?.location ? 'true' : 'false'}
                                />
                            </div>
                            <div className="mt-1 text-right">{errors?.location && <p className='text-red-600 text-sm'>{errors?.location?.message}</p>}</div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Seller Name'
                                    type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    {...register("sellerName", {
                                        required: 'required'
                                    })}
                                    aria-invalid={errors?.sellerName ? 'true' : 'false'}
                                />
                            </div>
                            <div className="mt-1 text-right">{errors?.sellerName && <p className='text-red-600 text-sm'>{errors?.sellerName?.message}</p>}</div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Seller Phone'
                                    type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    {...register("sellerPhone", {
                                        required: 'required'
                                    })}
                                    aria-invalid={errors?.sellerPhone ? 'true' : 'false'}
                                />
                            </div>
                            <div className="mt-1 text-right">{errors?.sellerPhone && <p className='text-red-600 text-sm'>{errors?.sellerPhone?.message}</p>}</div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <textarea type='text' className="textarea textarea-bordered w-full" placeholder="Write down about product"
                            {...register("description", {
                                required: 'ProductName required'
                            })}
                            aria-invalid={errors?.description ? 'true' : 'false'}
                        ></textarea>
                        <div className="mt-1 text-right">{errors?.description && <p className='text-red-600 text-sm'>{errors?.description?.message}</p>}</div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddProduct;