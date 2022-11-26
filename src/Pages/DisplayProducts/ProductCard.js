import React from 'react';
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ProductCard = ({ product, sellerInfo, handleReport }) => {
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
        yearsOfUse
    } = product;

    return (
        <div className="flex flex-col p-6 space-y-6 overflow-hidden rounded-lg shadow-md">
            <div className="flex justify-between">
                <div className="flex flex-col space-y-1">
                    <p className='flex text-sm'>Seller:
                        <span className='font-medium ml-1'>{sellerName}</span>
                        <span className='ml-1 mt-1'>{sellerInfo?.verification && <FaCheckCircle className='text-blue-600' />}</span>
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
                <h2 className="mb-1 text-xl font-extrabold italic font-mono">{productName}</h2>
                <div className='flex justify-between my-3 text-sm font-medium'>
                    <p>OriginalPrice: <span className='text-red-600 font-extrabold text-base'>${originalPrice}</span></p>
                    <p>ResalePrice: <span className='text-green-600 font-extrabold text-base'>${resalePrice}</span></p>
                </div>
                <div className='flex justify-between mb-3 text-base font-medium'>
                    <p>PurchaseYear: <span className=''>{purchaseYear}</span></p>
                    <p>Years of Use: <span className=''>{yearsOfUse}</span></p>
                </div>
                <div className='flex justify-between mb-3 text-base font-medium'>
                    <p>Condition: <span className=''>{condition}</span></p>
                    <p>Color: <span className=''>{color}</span></p>
                </div>
                <p className="text-sm">{description}</p>
                <div className='mt-5 gap-5 grid grid-cols-2'>
                    <p className='flex items-center gap-2'>
                        <span className='text-gray-500'><FaMapMarkerAlt /></span>
                        <span>{location}</span>
                    </p>
                    <div>
                        <Link>
                            <button className="btn btn-outline w-full btn-success">Book Now</button>
                        </Link>
                    </div>
                </div>
                <div className='mt-5 gap-5 grid grid-cols-2'>
                    <div>
                        <button className="btn btn-outline btn-sm normal-case w-full btn-info">Add to Wishlist</button>
                    </div>
                    <div>
                        <button onClick={() => handleReport(product)}
                            className="btn btn-outline btn-sm w-full btn-error normal-case">Report to Admin</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;