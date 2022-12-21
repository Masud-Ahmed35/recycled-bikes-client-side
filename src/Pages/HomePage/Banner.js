import React from 'react';
import banner from '../../Assets/banner.png'

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${banner})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="">
                        <h1 className="mb-5 text-5xl font-extrabold italic">Hey Bike Lovers</h1>
                        <h1 className="mb-5 text-3xl font-bold">Dream, Try, Believe & Achieve it.</h1>
                        <p className="mb-5 lg:w-3/4 lg:mx-auto lg:text-lg">Motorcycles in Bangladesh form an important part of how the population
                            travels daily. With an ever-shrinking road space, two-wheelers are a better option for
                            many to negotiable the many challenges that cities across the country throws at commuters.
                            And it has always been a much more affordable option for the masses.
                        </p>
                        <button className="btn bg-gradient-to-r from-teal-600 to-red-500 border-0">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;