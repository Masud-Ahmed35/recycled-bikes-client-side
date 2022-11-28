import React from 'react';
import { Link } from 'react-router-dom';
import q1 from '../../Assets/q1.png'
import q2 from '../../Assets/q2.jpg'
import q3 from '../../Assets/q3.png'
import q4 from '../../Assets/q4.jpeg'

const Blog = () => {
    return (
        <section class="">
            <div class="container px-6 py-10 mx-auto">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">recent posts </h1>

                    <button class="focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                <hr class="my-8 border-gray-200 dark:border-gray-700" />

                <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {/* Q-1  */}
                    <div>
                        <img class="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={q1} alt="" />
                        <div class="mt-8">
                            <h1 class="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                                What are the different ways to manage a state in a React application?
                            </h1>

                            <p class="mt-2 text-gray-500">
                                The Four Kinds of React State to Manage
                                <br />
                                1. Local state
                                <br />
                                2. Global state
                                <br />
                                3. Server state
                                <br />
                                4. URL state
                            </p>

                            <div class="flex items-center justify-end mt-4">
                                <div>
                                    <Link class="text-lg font-medium text-gray-700 italic hover:underline hover:text-gray-500">
                                        Masud Ahmed
                                    </Link>

                                    <p class="text-sm text-gray-500">November 28, 2022</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Q-2  */}
                    <div>
                        <img class="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={q2} alt="" />
                        <div class="mt-8">
                            <h1 class="mt-4 text-xl font-semibold text-gray-800">
                                How does prototypical inheritance work?
                            </h1>

                            <p class="mt-2 text-gray-500">
                                The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects.
                                <br />
                                It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the Prototype of an object, we use Object. getPrototypeOf and Object.
                            </p>

                            <div class="flex items-center justify-end mt-4">
                                <div>
                                    <Link class="text-lg font-medium text-gray-700 italic hover:underline hover:text-gray-500">
                                        Masud Ahmed
                                    </Link>

                                    <p class="text-sm text-gray-500">November 28, 2022</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Q-3  */}
                    <div>
                        <img class="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={q3} alt="" />
                        <div class="mt-8">
                            <h1 class="mt-4 text-xl font-semibold text-gray-800">
                                React vs. Angular vs. Vue?
                            </h1>

                            <p class="mt-2 text-gray-500">
                                A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system.
                                <br />
                                <br />
                                They enable you to catch bugs early in the development process. Automated unit tests help a great deal with regression testing. They detect code smells in your codebase.
                            </p>

                            <div class="flex items-center justify-end mt-4">
                                <div>
                                    <Link class="text-lg font-medium text-gray-700 italic hover:underline hover:text-gray-500">
                                        Masud Ahmed
                                    </Link>

                                    <p class="text-sm text-gray-500">November 28, 2022</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Q-4  */}
                    <div>
                        <img class="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={q4} alt="" />
                        <div class="mt-8">
                            <h1 class="mt-4 text-xl font-semibold text-gray-800">
                                What is a unit test? Why should we write unit tests?
                            </h1>

                            <p class="mt-2 text-gray-500">
                                Both - Angular JS and React JS frameworks are used to create web interfaces for front end development.
                                <br />
                                Angular is Google's matured and advanced JavaScript framework based on TypeScript, whereas Vue is a progressive open-source front-end JavaScript framework created by Evan You.
                            </p>

                            <div class="flex items-center justify-end mt-4">
                                <div>
                                    <Link class="text-lg font-medium text-gray-700 italic hover:underline hover:text-gray-500">
                                        Masud Ahmed
                                    </Link>

                                    <p class="text-sm text-gray-500">November 28, 2022</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;