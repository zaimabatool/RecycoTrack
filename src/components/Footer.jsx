import React from "react";
import logo from "./../assets/assets/images/recycle.png";
import { FaSquareFacebook, FaSquareInstagram, FaSquareTwitter, FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function Footer() {
  return (
    <footer className="bg-secondary text-white py-12 px-6 sm:px-12 lg:px-24 font-verdana relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-10 md:flex-row flex-col items-start animate-fade-in-up opacity-0">
        
        {/* Brand Section */}
        <div className="w-full md:w-[350px] space-y-6">
          <div className="logo group cursor-pointer inline-block">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={logo}
                alt="RecycoTrack Logo"
                className="w-12 h-12 object-contain group-hover:rotate-12 transition-transform duration-500"
              />
              <div>
                <h2 className="text-2xl font-bold tracking-tight">RecycoTrack</h2>
                <h4 className="text-sm font-medium text-primary tracking-widest uppercase">
                  Smart Scrap Selling
                </h4>
              </div>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm leading-relaxed">
            Making scrap selling smarter and easier in Sahiwal. Upload photos,
            get AI-powered analysis, and receive instant payments for your
            recyclable materials.
          </p>
          
          <div className="flex gap-5 pt-2">
            {[
              { Icon: FaSquareFacebook, color: 'hover:text-blue-500' },
              { Icon: FaSquareTwitter, color: 'hover:text-sky-400' },
              { Icon: FaSquareInstagram, color: 'hover:text-pink-500' }
            ].map(({ Icon, color }, i) => (
              <Icon 
                key={i} 
                className={`text-2xl text-gray-400 ${color} hover:scale-125 transition-all cursor-pointer duration-300`} 
              />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-auto min-w-[150px]">
          <h3 className="text-lg font-bold mb-6 text-white border-b border-primary/20 pb-2 inline-block">Quick Link</h3>
          <nav className="flex flex-col space-y-3">
            {["Home", "Rate List", "Upload Scrap", "About Us", "Contact Us"].map((link) => (
              <a 
                key={link} 
                href={link === "Home" ? "/" : `/${link.toLowerCase().replace(/ /g, '-')}`} 
                className="text-gray-400 text-sm hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group w-fit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-auto">
          <h3 className="text-lg font-bold mb-6 text-white border-b border-primary/20 pb-2 inline-block">Contact Info</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-400 hover:text-white transition-all cursor-pointer group">
              <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <FaLocationDot />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-bold transition-opacity mb-0.5">Address</span>
                <p className="group-hover:text-accent transition-colors">Sahiwal, Punjab, Pakistan</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-400 hover:text-white transition-all cursor-pointer group">
              <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <FaPhoneAlt />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-bold transition-opacity mb-0.5">Phone</span>
                <p className="group-hover:text-accent transition-colors font-bold">+92 300 1234567</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-400 hover:text-white transition-all cursor-pointer group">
              <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <IoMdMail />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-bold transition-opacity mb-0.5">Email</span>
                <p className="group-hover:text-accent transition-colors">info@recycotrack.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-extrabold text-gray-500">
          <p className="hover:text-primary transition-colors cursor-default">
            &copy; 2024 RecycoTrack. All rights reserved.
          </p>
          <p className="flex items-center gap-2 group">
            Powered By: <span className="text-primary group-hover:text-white group-hover:scale-105 transition-all cursor-pointer">RecycoTrack Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
