import React from 'react'
import { FaRegBuilding } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { LuTimer } from "react-icons/lu";
import { IoCallOutline } from "react-icons/io5";

import { FaCamera } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";

function InfoCard() {
  return (
    <div className="w-full">
      <div className="max-w-[1280px] w-full mx-auto flex py-16 px-4 flex-col lg:flex-row gap-12 items-start">

        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-verdana mb-4">Why Choose RecycoTrack?</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              RecycoTrack is revolutionizing the scrap selling experience in Sahiwal. We combine cutting-edge AI technology with traditional scrap buying to make recycling easier, faster, and more rewarding for everyone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 p-3 bg-primary rounded-xl text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 transition-transform hover:scale-105">
                <FaCamera className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-lg mb-1">AI-Powered Detection</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Advanced technology for accurate material identification</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 p-3 bg-primary rounded-xl text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 transition-transform hover:scale-105">
                <FaRupeeSign className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-lg mb-1">Fair Rates</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Live market rates updated regularly for transparency</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 p-3 bg-primary rounded-xl text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 transition-transform hover:scale-105">
                <LuTimer className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-lg mb-1">Quick & Convenient</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Fast processing and flexible pickup options available</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 p-3 bg-primary rounded-xl text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 transition-transform hover:scale-105">
                <GoShieldCheck className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-lg mb-1">Trusted & Reliable</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Secure transactions & professional services guaranteed</p>
              </div>
            </div>
          </div>
        </div>


        {/* Right Section - Scrap Center Info */}
        <div className="w-full lg:w-1/2 bg-bg-light p-8 rounded-2xl border border-primary/10 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary mb-8 border-b border-primary/10 pb-4">
            Scrap Center Information
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className='w-12 h-12 rounded-xl flex justify-center items-center bg-white text-primary shadow-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-colors'>
                <FaRegBuilding className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-lg">Center Name</h3>
                <p className="text-gray-600">RecycoTrack Scrap Center</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className='w-12 h-12 rounded-xl flex justify-center items-center bg-white text-primary shadow-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-colors'>
                <CiLocationOn className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-lg">Address</h3>
                <p className="text-gray-600">Main Bazar Road, Sahiwal, Punjab, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className='w-12 h-12 rounded-xl flex justify-center items-center bg-white text-primary shadow-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-colors'>
                <LuTimer className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-lg">Working Hours</h3>
                <p className="text-gray-600">Monday – Saturday: 8:00 AM – 6:00 PM</p>
                <p className="text-gray-500 text-sm">Sunday: Closed</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className='w-12 h-12 rounded-xl flex justify-center items-center bg-white text-primary shadow-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-colors'>
                <IoCallOutline className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-lg">Contact</h3>
                <p className="text-gray-600 font-medium">+92 300 1234567</p>
                <p className="text-gray-600">info@recycotrack.com</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default InfoCard
