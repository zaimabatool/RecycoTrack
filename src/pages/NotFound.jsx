import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/assets/images/recycle.png';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <img
        src={logo}
        alt="RecycoTrack"
        className="w-24 h-24 object-contain mb-8 opacity-50 grayscale"
      />
      <h1 className="text-9xl font-extrabold text-secondary">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-primary tracking-tight">
        Page Not Found
      </h2>
      <p className="mt-4 text-lg text-gray-600 text-center max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been removed or doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-8 px-8 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
