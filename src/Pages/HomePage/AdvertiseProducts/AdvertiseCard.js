import React from 'react';

const AdvertiseCard = ({ product }) => {
    return (
        <div>
            <div className="rounded-md shadow-md">
                <img src={product?.productImage} alt="" className="object-cover object-center w-full rounded-t-md h-44" />
                <div className="flex flex-col justify-between p-6 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-lg font-bold tracking-wide">{product?.productName}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertiseCard;