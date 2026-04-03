import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaChevronDown, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";
import { useData } from "../context/DataContext";
import { renderAvatar } from "../utils/avatarHelper";
import logo from "./../assets/assets/images/recycle.png";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rate List", path: "/rate-list" },
    { name: "How It Work", path: "/coming-soon" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50">
      <div className="w-full p-1 fixed top-0 left-0 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-[1280px] w-full h-[70px] flex items-center justify-between mx-auto px-4">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <img
              src={logo}
              alt="RecycoTrack Logo"
              className="w-10 h-10 object-contain group-hover:rotate-12 transition-transform duration-500"
            />
            <div>
              <p className="font-bold font-[Verdana] text-secondary text-xl tracking-tight">
                RecycoTrack
              </p>
              <p className="font-[Arial] text-teal-800 text-[10px] uppercase font-bold tracking-widest opacity-80">
                Smart Scrap Selling
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => 
                    `font-bold transition-all duration-300 relative py-1 group ${
                      isActive ? "text-primary" : "text-secondary hover:text-primary"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-primary transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}></span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop Buttons / Profile Dropdown */}
            <div className="flex items-center gap-4 ml-4">
              {currentUser ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner border border-primary/20 text-xl font-bold">
                      {renderAvatar(currentUser.avatar)}
                    </div>
                    <div className="text-left hidden sm:block">
                      <p className="text-xs font-bold text-secondary leading-none mb-1">{currentUser.name}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{currentUser.role === 'admin' ? 'Admin' : 'User'}</p>
                    </div>
                    <FaChevronDown className={`text-xs text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-4 py-3 border-b border-gray-50 mb-1 sm:hidden">
                        <p className="text-sm font-bold text-secondary">{currentUser.name}</p>
                        <p className="text-xs text-gray-400">{currentUser.email}</p>
                      </div>
                      
                      <button
                        onClick={() => { navigate("/profile"); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-secondary hover:bg-primary/5 hover:text-primary transition-all text-left"
                      >
                        <FaUserCircle className="text-lg opacity-70" />
                        Edit Profile
                      </button>
                      
                      <button
                        onClick={() => { navigate("/user-orders"); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-secondary hover:bg-primary/5 hover:text-primary transition-all text-left"
                      >
                        <FaShoppingBag className="text-lg opacity-70" />
                        My Orders
                      </button>
                      
                      <button
                        onClick={() => { logout(); navigate('/'); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all text-left mt-1"
                      >
                        <FaSignOutAlt className="text-lg opacity-70" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => 
                       `px-5 py-2.5 rounded-xl font-bold transition-all ${
                         isActive ? "bg-primary/10 text-primary" : "text-secondary hover:bg-gray-100"
                       }`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="px-6 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark transition-all font-bold shadow-md hover:shadow-lg active:scale-95"
                  >
                    SignUp
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondary text-2xl focus:outline-none p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-white z-40 md:hidden flex flex-col p-6 shadow-2xl animate-in slide-in-from-top-full duration-300 ease-out overflow-y-auto max-h-[calc(100vh-70px)]">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `text-xl font-bold py-4 px-4 rounded-2xl transition-all ${
                    isActive ? "bg-primary/10 text-primary" : "text-secondary hover:bg-gray-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-gray-100">
              {currentUser ? (
                <>
                  <div className="px-4 mb-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3">Account</p>
                    <div className="flex items-center gap-4 py-2">
                       <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-2xl border border-primary/20 shadow-inner">
                         {renderAvatar(currentUser.avatar)}
                       </div>
                       <div className="overflow-hidden">
                         <p className="font-bold text-secondary truncate">{currentUser.name}</p>
                         <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <NavLink
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) => 
                        `py-3 rounded-xl font-bold flex flex-col justify-center items-center gap-1 transition-all text-sm border-2 ${
                          isActive ? "bg-primary/10 border-primary text-primary shadow-inner" : "border-gray-100 text-secondary hover:bg-gray-50"
                        }`
                      }
                    >
                      <FaUserCircle className="text-xl" /> 
                      <span>Profile</span>
                    </NavLink>
                    <NavLink
                      to="/user-orders"
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) => 
                        `py-3 rounded-xl font-bold flex flex-col justify-center items-center gap-1 transition-all text-sm border-2 ${
                          isActive ? "bg-primary/10 border-primary text-primary shadow-inner" : "border-gray-100 text-secondary hover:bg-gray-50"
                        }`
                      }
                    >
                      <FaShoppingBag className="text-xl" /> 
                      <span>Orders</span>
                    </NavLink>
                  </div>

                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }}
                    className="w-full py-4 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => 
                      `w-full py-4 rounded-2xl border-2 font-bold text-center transition-all ${
                        isActive ? "bg-primary/10 border-primary text-primary" : "border-secondary text-secondary hover:bg-gray-50"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-center hover:bg-primary-dark shadow-lg active:scale-95 transition-all"
                  >
                    SignUp
                  </NavLink>
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
