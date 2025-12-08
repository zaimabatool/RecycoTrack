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
    <div className="w-100%">
      <div className="max-w-[1280px] w-full mx-auto flex py-[70px] px-[10px] py-[20px] max-[990px]:flex-col gap-[20px]">


        <div className="w-[50%] flex justify-center flex-col items-start gap-[30px] max-[990px]:w-[100%]">
          <h2 className="sm:text-[30px] text-[22px] font-verdana text-[#0e9d90] font-bold">Why Choose RecycoTrack?</h2>
          <p className="my-5 text-[#555]">RecycoTrack is revolutionizing thr scrap selling experience in sahiwal.We combine cutting-edge AI technology with traditional scrap buying to make recycling easier,faster,and more rewarding for everyone.</p>
          <div className="flex items-center justify-center gap-[20px] w-[90%] flex-col sm:flex-row">
            <div className="w-[100%] flex gap-[20px] sm:w-[40%]">
              <div className="h-10 p-3 bg-[#0e9d90] rounded-lg text-[white] cursor-pointer flex items-center justify-center"><FaCamera /></div>
              <div className="">
                <h3>AI-Powered detection</h3>
                <p>Advanced technology for accurate material identification</p>
              </div>
            </div>

            <div className="sm:w-[40%] w-[100%] flex gap-[20px]">
              <div className="h-10 p-3 bg-[#0e9d90] rounded-lg text-[white] cursor-pointer flex items-center justify-cente"><FaRupeeSign /></div>
              <div className="">
                <h3>Fair and transparent rates</h3>
                <p className="trans">Live market rates updated regularly</p>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col items-center justify-center gap-[20px] w-[90%]">
            <div className="flex gap-[20px] w-[100%] sm:w-[40%]">
              <div className="h-10 p-3 bg-[#0e9d90] rounded-lg text-[white] cursor-pointer flex items-center justify-cente"><LuTimer /></div>
              <div className="">
                <h3>Quick & Convenient</h3>
                <p className=" fast">Fast processing and flexible pickup options.</p>
              </div>
            </div>
            <div className="w-[100%] sm:w-[40%] flex gap-[20px]">
              <div className="h-10 p-3 bg-[#0e9d90] rounded-lg text-[white] cursor-pointer flex items-center justify-cente"><GoShieldCheck /></div>
              <div className="reliable">
                <h3>Trusted & Reliable</h3>
                <p>Secure transactions & professional services</p>
              </div>
            </div>
          </div>
        </div>


        {/* section 2 */}
        <div class="bg-teal-100  w-[50%] max-[990px]:w-[100%] p-6 rounded-xl ">
          <h2 class="text-2xl font-bold text-black-800 mb-6">
            Scrap Center Information
          </h2>
          {/* div1 */}

          <div class="mb-5">
            <div class="flex items-center gap-2 ">
              <div className='w-[45px] h-[45px] rounded-[10px] flex justify-center items-center bg-amber-50'><FaRegBuilding /></div>
              <div>
                <h3 class="font-semibold text-black 700">Center Name</h3>
                <p class="text-black-600 ">RecycoTrack Scrap Center</p>
              </div>
            </div>
          </div>
          {/* div2 */}
          <div class="mb-5">
            <div class="flex items-center gap-2 ">
              <div className='w-[45px] h-[45px] rounded-[10px] flex justify-center items-center bg-amber-50'><CiLocationOn /></div>
              <div>
                <h3 class="font-semibold text-black-700 ">Address</h3>
                <p class="text-black-600 ">
                  Main Bazar Road, Sahiwal, Punjab, Pakistan</p>
              </div>
            </div>
          </div>

          {/* div3 */}
          <div class="mb-5">
            <div class="flex items-center gap-2">
              <div className='w-[45px] h-[45px] rounded-[10px] flex justify-center items-center bg-amber-50'><LuTimer /></div>
              <div>
                <h3 class="font-semibold text-black-700">Working Hours</h3>
                <p class="text-black-600 ">Monday – Saturday: 8:00 AM – 6:00 PM</p>
                <p class="text-black-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
          {/* div4 */}

          <div>
            <div class="flex items-center gap-2 ">
              <div className='w-[45px] h-[45px] rounded-[10px] flex justify-center items-center bg-amber-50'><IoCallOutline /></div>
              <div>
                <h3 class="font-semibold text-black-700 ">Contact</h3>
                <p class="text-black-600">+92 300 1234567</p>
                <p class="text-black-600">info@recycotrack.com</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default InfoCard
