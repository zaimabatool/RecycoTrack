import React from 'react'
import { FaRegBuilding, FaCamera, FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { LuTimer } from "react-icons/lu";
import { IoCallOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";

function InfoCard() {
  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-[1280px] w-full mx-auto px-4 flex flex-col lg:flex-row gap-12 items-stretch">

        {/* Left Section - Why Choose Us */}
        <div className="w-full lg:w-3/5 flex flex-col gap-10">
          <div className="animate-fade-in-left opacity-0">
            <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mb-6">
              Why Choose <span className="text-primary">RecycoTrack?</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-3xl font-medium">
              RecycoTrack is revolutionizing the scrap selling experience in Sahiwal. We combine cutting-edge AI technology with traditional scrap buying to make recycling easier, faster, and more rewarding for everyone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <div className="bg-bg-light/30 p-6 rounded-2xl border border-primary/5 hover:shadow-xl transition-all duration-300 group animate-fade-in-up opacity-0 animation-delay-100">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center text-xl mb-4 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <FaCamera />
              </div>
              <h3 className="font-bold text-secondary text-lg mb-2">AI-Powered Detection</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Advanced technology for accurate material identification and grading.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-bg-light/30 p-6 rounded-2xl border border-primary/5 hover:shadow-xl transition-all duration-300 group animate-fade-in-up opacity-0 animation-delay-200">
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center text-xl mb-4 shadow-lg shadow-teal-600/20 group-hover:scale-110 transition-transform">
                <FaRupeeSign />
              </div>
              <h3 className="font-bold text-secondary text-lg mb-2">Fair Market Rates</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Live updates ensure you always get the best value for your materials.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-bg-light/30 p-6 rounded-2xl border border-primary/5 hover:shadow-xl transition-all duration-300 group animate-fade-in-up opacity-0 animation-delay-300">
              <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center text-xl mb-4 shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
                <LuTimer />
              </div>
              <h3 className="font-bold text-secondary text-lg mb-2">Quick Pickup</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Schedule a pickup at your convenience and get paid on the spot.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-bg-light/30 p-6 rounded-2xl border border-primary/5 hover:shadow-xl transition-all duration-300 group animate-fade-in-up opacity-0 animation-delay-400">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl mb-4 shadow-lg shadow-purple-600/20 group-hover:scale-110 transition-transform">
                <GoShieldCheck />
              </div>
              <h3 className="font-bold text-secondary text-lg mb-2">Safe & Reliable</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Verified riders and secure digital payments for your peace of mind.</p>
            </div>
          </div>
        </div>

        {/* Right Section - Scrap Center Info */}
        <div className="w-full lg:w-2/5 animate-fade-in-right opacity-0 animation-delay-200">
          <div className="bg-secondary text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden group/main hover:shadow-primary/10 transition-all duration-500 h-full border border-white/5">
            {/* Decorative Pulse Circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover/main:w-60 group-hover/main:h-60 transition-all duration-700"></div>
            
            <h2 className="text-2xl font-bold mb-8 border-b border-white/10 pb-4 relative z-10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              Scrap Center Info
            </h2>

            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4 animate-fade-in-right opacity-0 animation-delay-300 group cursor-pointer">
                <div className='w-12 h-12 rounded-xl flex justify-center items-center bg-white/10 text-primary shadow-inner shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                  <FaRegBuilding className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors">Center Name</h3>
                  <p className="text-white/80 group-hover:text-white transition-colors">RecycoTrack Scrap Center</p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-fade-in-right opacity-0 animation-delay-400 group cursor-pointer">
                <div className='w-12 h-12 rounded-xl flex justify-center items-center bg-white/10 text-primary shadow-inner shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                  <CiLocationOn className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors">Address</h3>
                  <p className="text-white/80 group-hover:text-white transition-colors">Main Bazar Road, Sahiwal, Punjab, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-fade-in-right opacity-0 animation-delay-500 group cursor-pointer">
                <div className='w-12 h-12 rounded-xl flex justify-center items-center bg-white/10 text-primary shadow-inner shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                  <LuTimer className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors">Working Hours</h3>
                  <p className="text-white/80 group-hover:text-white transition-colors">Mon – Sat: 8:00 AM – 6:00 PM</p>
                  <p className="text-white/40 text-sm group-hover:text-white/60 transition-colors">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-fade-in-right opacity-0 animation-delay-600 group cursor-pointer">
                <div className='w-12 h-12 rounded-xl flex justify-center items-center bg-white/10 text-primary shadow-inner shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                  <IoCallOutline className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors">Contact</h3>
                  <p className="text-white/90 group-hover:text-primary font-bold transition-all">+92 300 1234567</p>
                  <p className="text-white/60 group-hover:text-white transition-colors">info@recycotrack.com</p>
                </div>
              </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoCard
