import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { _id, categoryName, categoryImage } = category;

    return (
        <Link to={`/category/${_id}`} title='Click on to See All Product'>
            <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="px-4 py-2">
                    <h1 className="text-xl text-center font-extrabold italic font-serif border-t border-4 rounded-lg text-gray-800 uppercase">{categoryName}</h1>
                </div>
                <img className="object-cover mt-2" src={categoryImage} alt="" />

            </div>
        </Link>
    );
};

export default Category;