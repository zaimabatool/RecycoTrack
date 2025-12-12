import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/assets/images/recycle.png';
import { FaTools } from 'react-icons/fa';

const ComingSoon = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-ping"></div>
                <div className="relative bg-white p-6 rounded-full shadow-xl">
                    <FaTools className="w-16 h-16 text-primary" />
                </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-secondary text-center mb-4">
                Coming Soon
            </h1>

            <p className="text-xl md:text-2xl text-primary font-medium mb-8 text-center">
                We're working hard to bring you this feature!
            </p>

            <p className="text-gray-600 text-center max-w-lg mb-12">
                Our team is currently building this functionality to make your scrap selling experience even better. Stay tuned for updates.
            </p>

            <Link
                to="/"
                className="px-8 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ComingSoon;
