import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useData } from "../context/DataContext";
import logo from "./../assets/assets/images/recycle.png";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative z-50">
      <div className="w-full p-1 fixed top-0 left-0 bg-white shadow-sm">
        <div className="max-w-[1280px] w-full h-[70px] flex items-center justify-between mx-auto px-4">

          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('/')}>
            <img
              src={logo}
              alt="RecycoTrack Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <p className="font-bold font-[Verdana] text-secondary text-xl">
                RecycoTrack
              </p>
              <p className="font-[Arial] text-teal-800 text-sm">
                Smart Scrap Selling
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <div className="flex items-center gap-6">
              <button onClick={() => navigate('/')} className="text-secondary hover:text-accent font-medium transition-colors">
                Home
              </button>
              <button onClick={() => navigate('/rate-list')} className="text-secondary hover:text-accent font-medium transition-colors">
                Rate List
              </button>
              <button onClick={() => navigate('/coming-soon')} className="text-secondary hover:text-accent font-medium transition-colors">
                How It Work
              </button>
              <button onClick={() => navigate('/about-us')} className="text-secondary hover:text-accent font-medium transition-colors">
                About Us
              </button>
              <button onClick={() => navigate('/contact-us')} className="text-secondary hover:text-accent font-medium transition-colors">
                Contact Us
              </button>
            </div>

            {/* Desktop Buttons */}
            <div className="flex items-center gap-3">
              {currentUser ? (
                <>
                  <button
                    onClick={() => navigate("/user-orders")}
                    className="px-4 py-2 rounded-lg text-secondary hover:bg-gray-100 transition-all font-medium flex items-center gap-2"
                  >
                    <FaUserCircle /> My Orders
                  </button>
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all font-medium shadow-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 rounded-lg text-secondary hover:bg-gray-100 transition-all font-medium"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => navigate("/signup")}
                    className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-all font-medium shadow-md hover:shadow-lg"
                  >
                    SignUp
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondary text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-white z-40 md:hidden flex flex-col p-6 shadow-xl animate-in slide-in-from-top-10 duration-200">
          <div className="flex flex-col gap-4 text-center">
            <button onClick={() => handleNavigate('/')} className="text-secondary text-lg font-medium py-2 border-b border-gray-100 hover:text-primary">
              Home
            </button>
            <button onClick={() => handleNavigate('/rate-list')} className="text-secondary text-lg font-medium py-2 border-b border-gray-100 hover:text-primary">
              Rate List
            </button>
            <button onClick={() => handleNavigate('/coming-soon')} className="text-secondary text-lg font-medium py-2 border-b border-gray-100 hover:text-primary">
              How It Work
            </button>
            <button onClick={() => handleNavigate('/about-us')} className="text-secondary text-lg font-medium py-2 border-b border-gray-100 hover:text-primary">
              About Us
            </button>
            <button onClick={() => handleNavigate('/contact-us')} className="text-secondary text-lg font-medium py-2 border-b border-gray-100 hover:text-primary">
              Contact Us
            </button>

            <div className="flex flex-col gap-3 mt-4">
              {currentUser ? (
                <>
                  <button
                    onClick={() => handleNavigate("/user-orders")}
                    className="w-full py-3 rounded-lg border border-secondary text-secondary font-bold hover:bg-gray-50 flex justify-center items-center gap-2"
                  >
                    <FaUserCircle /> My Orders
                  </button>
                  <button
                    onClick={() => { logout(); handleNavigate('/'); }}
                    className="w-full py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 shadow-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigate("/login")}
                    className="w-full py-3 rounded-lg border border-secondary text-secondary font-bold hover:bg-gray-50"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigate("/signup")}
                    className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark shadow-md"
                  >
                    SignUp
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
