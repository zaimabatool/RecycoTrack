import React from "react";
import logo from "./../assets/assets/images/recycle.png";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
function Footer() {
  return (
    <footer className="bg-[#051b46] text-white py-8 px-5 sm:px-10 lg:px-20 font-verdana">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between pb-5 md:flex-row md:justify-around flex-col items-start">
        <div className="w-full md:w-[300px] p-2 mb-5 md:mb-0 order-1">
          <div className="logo">
            <img
              src={logo}
              alt="RecycoTrack Logo"
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-xl font-bold mb-1">RecycoTrack</h2>
            <h4 className="text-sm font-normal mt-0 mb-3 text-teal-400">
              Smart Scrap Selling
            </h4>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            Making scrap selling smarter and easier in Sahiwal. Upload photos,
            get AI-powered analysis, and receive instant payments for your
            recyclable materials.
          </p>
          <div className="flex justify-around ">
            <FaSquareFacebook />
            <FaTwitterSquare />
            <FaSquareInstagram />
            <div className="flex space-x-4"></div>
            <i className="fa-brands fa-facebook-f text-teal-400 text-lg"></i>
            <i className="fa-brands fa-instagram text-teal-400 text-lg"></i>
            <i className="fa-brands fa-twitter text-teal-400 text-lg"></i>
          </div>
        </div>

        <div className="w-full md:w-[300px] p-2 mb-5 md:mb-0 order-2">
          <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
          <div className="links space-y-2">
            <a href="/" className="text-white text-sm block hover:underline">
              Home
            </a>
            <a href="#" className="text-white text-sm block hover:underline">
              Rate List
            </a>
            <a href="#" className="text-white text-sm block hover:underline">
              Upload scrap
            </a>
            <a href="#" className="text-white text-sm block hover:underline">
              About Us
            </a>
            <a href="#" className="text-white text-sm block hover:underline">
              Contact Us
            </a>
          </div>
        </div>

        <div className="w-full md:w-[300px] p-2 mb-5 md:mb-0 order-3">
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <i class="fa-solid fa-location-dot"></i>
          <div className="flex items-center text-sm mb-2">
            <i className="fa-solid fa-location-dot mr-3 text-teal-400">
              <FaLocationDot />
            </i>

            <p> Sahiwal, Punjab, Pakistan</p>
          </div>
          <div className="flex items-center text-sm mb-2">
            <i className="fa-solid fa-phone mr-3 text-teal-400">
              <FaPhoneAlt />
            </i>
            <p>+92 300 1234567</p>
          </div>
          <div className="flex items-center text-sm">
            <i className="fa-regular fa-message mr-3 text-teal-400">
              <IoMdMail />
            </i>
            <p>info@recycotrack.com</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/20"></div>

      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-0 text-xs md:flex-row flex-col md:items-center items-start">
        <p>&copy;2024 RecycoTrack. All rights reserved.</p>
        <p className="mt-1 md:mt-0">Powered By: RecycoTrack</p>
      </div>
    </footer>
  );
}

export default Footer;
