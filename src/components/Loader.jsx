import React from 'react';
import logo from '../assets/assets/images/recycle.png';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-24 h-24 border-4 border-[#0e9d90] border-t-transparent rounded-full animate-spin"></div>
                    <img
                        src={logo}
                        alt="Loading..."
                        className="w-16 h-16 object-contain animate-pulse"
                    />
                </div>
                <p className="mt-4 text-[#082b5c] font-bold text-lg animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default Loader;
