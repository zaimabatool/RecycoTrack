import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import WorkCard from "../components/WorkCard";
import MaterialCard from "../components/MaterialCard";
import Footer from "../components/Footer";
import heroImg from "./../assets/assets/images/heroleft.jpg";
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
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-[70px] bg-gradient-to-br from-bg-light to-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-40 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-[1280px] mx-auto px-4 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">

          {/* Left Side (Text) */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6 z-10">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-2">
              ♻️ Smart Scrap Selling in Sahiwal
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary leading-tight">
              Turn Your <span className="text-primary">Scrap</span> <br /> Into <span className="text-primary">Cash!</span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed">
              The smartest way to recycle. Get the best rates, instant pickup, and contribute to a greener planet with RecycoTrack.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
              <button
                onClick={() => navigate('/coming-soon')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white font-bold text-lg shadow-lg hover:bg-primary-dark hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Upload Scrap Now
              </button>

              <button
                onClick={() => navigate('/rate-list')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border-2 border-secondary text-secondary font-bold text-lg hover:bg-secondary hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                View Today's Rates
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Instant Payment
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Free Pickup
              </div>
            </div>
          </div>

          {/* Right Side (Image) */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative z-10">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-primary rounded-full opacity-10 animate-pulse"></div>
              <img
                src={heroImg}
                alt="Recycling Illustration"
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
              />
            </div>
          </div>
        </div>
      </div>

      <InfoCard />

      {/* Accepted Materials Section */}
      <div className="w-full py-16 bg-white">
        <div className="max-w-[1280px] w-full flex flex-col items-center mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 text-center">
            Accepted Materials
          </h2>

          <p className="text-gray-600 text-center max-w-2xl mb-12 text-lg">
            We accept a wide range of recyclable materials. Check what you can sell to us.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <MaterialCard name={"Plastic"} icons={<FaRecycle />} des={"Take clear photos of your scrap materials and upload them to our plateform"} clr={"bg-blue-500"} />
            <MaterialCard name={"Paper & CardBoard"} icons={<RiFilePaperLine />} des={"Our AI instantly analyzes and identifies the material type and acceptance status"} clr={"bg-purple-500"} />
            <MaterialCard name={"Metal"} icons={<FaRegCalendarCheck />} des={"Choose convenient pickup service"} clr={"bg-teal-500"} />
            <MaterialCard name={"E-Waste"} icons={<FaRupeeSign />} des={"Get accurate weighting andInstant payment via cash or JazzCash"} clr={"bg-green-500"} />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full py-16 bg-gray-50">
        <div className="w-full max-w-[1280px] flex flex-col items-center mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 text-center">
            How It Works
          </h2>

          <p className="text-gray-600 text-center max-w-2xl mb-12 text-lg">
            Four simple steps to turn your scrap into cash
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <WorkCard names={"Upload Photo"} icon={<IoCloudUploadOutline />} desc={"Pet, HDPE, PVC bottles & containers"} clrs={"bg-blue-600"} />
            <WorkCard names={"AI Checks"} icon={<FaTrain />} desc={"Newspapers, magazines, boxes"} clrs={"bg-orange-600"} />
            <WorkCard names={"Book Pickup"} icon={<GiMetalScales />} desc={"Aluminum, copper, steel iron"} clrs={"bg-gray-600"} />
            <WorkCard names={"Weight & Payment"} icon={<BsLaptop />} desc={"Electronics, circuit boards, wires"} clrs={"bg-purple-600"} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
