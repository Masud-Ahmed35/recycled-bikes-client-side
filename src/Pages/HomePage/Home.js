import React from 'react';
import Banner from './Banner';
import ClientReviews from './ClientReviews/ClientReviews';
import ReviewsForm from './ReviewsForm/ReviewsForm';

const Home = () => {
    return (
        <div>
            <Banner />
            <ClientReviews />
            <ReviewsForm />
        </div>
    );
};

export default Home;