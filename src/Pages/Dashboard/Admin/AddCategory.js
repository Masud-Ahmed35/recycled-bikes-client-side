import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthProvider';

const AddCategory = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();


    const handleAddCategory = data => {
        setLoading(true);
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_apiKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                const category = {
                    categoryName: data.name,
                    categoryImage: imageData?.data?.display_url
                }
                fetch(`${process.env.REACT_APP_API_URL}/categories/${user?.email}`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(category)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        console.log(error)
                    })
            })
            .catch(error => {
                setLoading(false);
                console.log(error)
            })
    }

    return (
        <section className=" w-1/2 p-6 mx-auto rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 text-center">Add a Category</h2>
            <form onSubmit={handleSubmit(handleAddCategory)}>
                <div className='mt-5'>
                    <label className="text-gray-700">Category Name</label>
                    <input type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        {...register("name", {
                            required: 'Please Provide Your Name'
                        })}
                        aria-invalid={errors?.name ? 'true' : 'false'}
                    />
                </div>
                <div className="mt-1 mb-5 text-right">{errors?.name && <p className='text-red-600 text-sm'>{errors?.name?.message}</p>}</div>
                <div className=''>
                    <label className="text-gray-700">Add an Image</label>
                    <input type="file"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        {...register("image", {
                            required: 'Please Provide an Image'
                        })}
                        aria-invalid={errors?.image ? 'true' : 'false'}
                    />
                </div>
                <div className="mt-1 text-right">{errors?.image && <p className='text-red-600 text-sm'>{errors?.image?.message}</p>}</div>
                <div className="flex justify-end mt-6">
                    <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                        {
                            loading ? 'Loading...' : 'Add Now'
                        }
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddCategory;