import React from 'react';
import AdvertiseProducts from './AdvertiseProducts/AdvertiseProducts';
import Banner from './Banner';
import Categories from './Categories/Categories';
import ClientReviews from './ClientReviews/ClientReviews';
import ReviewsForm from './ReviewsForm/ReviewsForm';

const Home = () => {
    return (
        <div>
            <Banner />
            <Categories />
            <AdvertiseProducts />
            <ClientReviews />
            <ReviewsForm />
        </div>
    );
};

export default Home;