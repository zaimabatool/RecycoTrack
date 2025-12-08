import React from "react";
import Navbar from "../components/Navbar";
import WorkCard from "../components/WorkCard";
import MaterialCard from "../components/MaterialCard";
import Footer from "../components/Footer";
import logo from "./../assets/assets/images/heroleft.jpg";
import InfoCard from "../components/InfoCard";
import { FaRecycle } from "react-icons/fa";
import { RiFilePaperLine } from "react-icons/ri";
import { GiMetalScales } from "react-icons/gi";
import { BsLaptop } from "react-icons/bs";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaTrain } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa6";
function Home() {
  return (
    <div>
      <Navbar />
      <div className="w-full bg-[#0e9d90]">
        <div className="max-w-[1280px] mx-auto flex items-center justify-center py-5 px-2 flex-col md:flex-row">
          {/* Right Side */}
          <div className="w-full md:w-1/2 h-[500px] text-white flex flex-col items-start justify-center gap-8">
            <h1 className="font-bold text-[32px] w-[60%] md:w-[60%] sm:w-[80%]">
              Sell Your Scrap Smarter with RecycoTrack
            </h1>

            <p className="w-[60%] md:w-[60%] sm:w-[80%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              debitis id, labore minus atque obcaecati recusandae magni optio
              voluptate eligendi.
            </p>

            <div className="w-[60%] sm:w-full flex items-center justify-start gap-5 flex-col sm:flex-row md:flex-row">
              <button className="w-[250px] p-2 rounded bg-white text-[#0e9d90] hover:bg-[#025952] hover:text-white hover:shadow-lg transition-all">
                Upload Scrap Now
              </button>

              <button className="w-[250px] p-2 rounded border border-white text-white bg-transparent hover:bg-[#025952] hover:text-white hover:border-transparent hover:shadow-lg transition-all">
                View Todays Rate
              </button>
            </div>
          </div>
          <div className="w-full h-[500px] flex items-center justify-center">
            <div className="bg-cover bg-center rounded-2xl">
              <img
                src={logo}
                alt="RecycoTrack Logo"
                className="w-[300px] h-[400px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <InfoCard />
      <div className="w-full ">
        <div className="max-w-[1280px] w-full flex flex-col items-center mx-auto">
          <h2 className="text-3xl font-verdana font-bold">
            Accepted Materials
          </h2>

          <p className="">
            We accept a wide range of recyclable materials. Check what you can sell
            to us.
          </p>

          <div className="flex">
            <MaterialCard name={"Plastic"} icons={<FaRecycle/>} des={"Take clear photos of your scrap materials and upload them to our plateform"} clr={"bg-blue-400"}/>
            <MaterialCard name={"Paper & CardBoard"} icons={<RiFilePaperLine/>} des={"Our AI instantly analyzes and identifies the material type and acceptance status"} clr={"bg-purple-400"}/>
            <MaterialCard name={"Metal"} icons={<FaRegCalendarCheck />} des={"Choose convenient pickup service"} clr={"bg-teal-400"}/>
            <MaterialCard name={"E-Waste"} icons={<FaRupeeSign />} des={"Get accurate weighting andInstant payment via cash or JazzCash"} clr={"bg-green-400"}/>
          </div>
        </div>

      </div>
      <div className="w-full">
        <div className="w-full max-w-[1280px] bg-white flex flex-col items-center mx-auto">
          <h2 className="text-3xl font-[Verdana] font-bold ">
            How It Works
          </h2>

          <p className="">
            Four simple steps to turn your scrap into cash
          </p>
          <div className="flex gap-[10px]">
            <WorkCard names={"Upload Photo"} icon={<IoCloudUploadOutline />} desc={"Pet, HDPE, PVC bottles & containers"} clrs={"bg-blue-500"}/>
            <WorkCard names={"AI Checks"} icon={<FaTrain />} desc={"Newspapers, magazines, boxes"} clrs={"bg-orange-600"}/>
            <WorkCard names={"Book Pickup"} icon={<GiMetalScales/>} desc={"Aluminum, copper, steel iron"} clrs={"bg-gray-500"}/>
            <WorkCard names={"Weight & Payment"} icon={<BsLaptop/>} desc={"Electronics, circuit boards, wires"} clrs={"bg-purple-500"}/>
          </div>
        </div>
      </div>

      <Footer />

      <div></div>
      <div></div>
    </div>
  );
}

export default Home;
