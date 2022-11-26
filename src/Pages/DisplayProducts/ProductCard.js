import React from 'react';
import { FaCheckCircle } from "react-icons/fa";

const ProductCard = ({ product }) => {
    const {
        availability,
        color,
        condition,
        description,
        location,
        originalPrice,
        postTime,
        productImage,
        productName,
        purchaseYear,
        resalePrice,
        sellerEmail,
        sellerName,
        sellerPhone,
        sellerVerification,
        yearsOfUse
    } = product;

    return (
        <div className="flex flex-col p-6 space-y-6 overflow-hidden rounded-lg shadow-md">
            <div className="flex justify-between">
                <div className="flex flex-col space-y-1">
                    <p className='flex text-sm'>Seller:
                        <span className='font-medium ml-1'>{sellerName}</span>
                        <span className='ml-1 mt-1'>{sellerVerification && <FaCheckCircle className='text-blue-600' />}</span>
                    </p>
                    <span className="text-xs">Email: {sellerEmail}</span>
                    <span className="text-xs">Phone: {sellerPhone}</span>
                </div>
                <div className='flex flex-col items-end'>
                    <p className='font-serif'>{postTime}</p>
                    <p className={`font-extrabold text-sm border-2 rounded-lg mt-1 px-2 py-1 ${availability === 'sold' ? 'text-red-600' : 'text-green-600'}`}>{availability}</p>
                </div>
            </div>
            <div>
                <img src={productImage} alt="" className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500" />
                <h2 className="mb-1 text-xl font-semibold">{productName}</h2>
                <p className="text-sm dark:text-gray-400">{description}</p>
            </div>
        </div>
    );
};

export default ProductCard;