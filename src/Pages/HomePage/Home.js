import React from 'react';
import Banner from './Banner';
import Categories from './Categories/Categories';
import ClientReviews from './ClientReviews/ClientReviews';
import ReviewsForm from './ReviewsForm/ReviewsForm';

const Home = () => {
    return (
        <div>
            <Banner />
            <Categories />
            <ClientReviews />
            <ReviewsForm />
        </div>
    );
};

export default Home;