import React from "react";
import { useNavigate } from "react-router-dom";
import WorkCard from "../components/WorkCard";
import MaterialCard from "../components/MaterialCard";
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
    <div className="bg-bg-light overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-bg-light to-white overflow-hidden border-b border-primary/5">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute top-40 right-40 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float animation-delay-2000"></div>

        <div className="max-w-[1280px] mx-auto px-4 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12">

          {/* Left Side (Text) */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-8 z-10 animate-fade-in-left opacity-0">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wide shadow-sm border border-primary/10">
              ♻️ Smart Scrap Selling in Sahiwal
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-secondary leading-tight">
              Turn Your <span className="text-primary">Scrap</span> <br /> 
              Into <span className="bg-linear-to-r from-primary to-[#06c2b1] bg-clip-text text-transparent">Instant Cash!</span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              The smartest way to recycle. Get the best rates, instant pickup, and contribute to a greener planet with RecycoTrack.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto pt-4 shadow-primary/5">
              <button
                onClick={() => navigate('/upload-scrap')}
                className="group relative w-full sm:w-auto px-10 py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Upload Scrap Now</span>
                <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </button>

              <button
                onClick={() => navigate('/rate-list')}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl border-2 border-secondary text-secondary font-bold text-lg hover:bg-secondary hover:text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Today's Rates
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4 text-sm text-gray-500 font-bold border-t border-gray-100 w-full md:w-auto">
              <div className="flex items-center gap-2 text-primary">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div> Instant Payment
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></div> Free Pickup
              </div>
            </div>
          </div>

          {/* Right Side (Image) */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative z-10 animate-fade-in-right opacity-0 animation-delay-200">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Outer Glowing Ring */}
              <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 bg-primary rounded-full opacity-10 animate-float shadow-2xl"></div>
              <img
                src={heroImg}
                alt="Recycling Illustration"
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-white"
                style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="animate-fade-in-up opacity-0 animation-delay-400">
        <InfoCard />
      </div>

      {/* Accepted Materials Section */}
      <div className="w-full py-24 bg-white">
        <div className="max-w-[1280px] w-full flex flex-col items-center mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up opacity-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-5">
              Accepted <span className="text-primary">Materials</span>
            </h2>
            <p className="text-gray-500 max-w-2xl text-lg font-medium leading-relaxed">
              We buy a wide range of recyclable materials. Help us build a cleaner Sahiwal by selling your scrap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
            <div className="animate-fade-in-up opacity-0 animation-delay-100">
                <MaterialCard name={"Plastic"} icons={<FaRecycle />} des={"We accept PET bottles, HDPE containers, PVC pipes, and more. Clean plastics get better rates."} clr={"bg-blue-600"} />
            </div>
            <div className="animate-fade-in-up opacity-0 animation-delay-200">
                <MaterialCard name={"Paper & Cardboard"} icons={<RiFilePaperLine />} des={"From newspapers and old books to corrugated boxes. Please keep them dry for maximum value."} clr={"bg-orange-600"} />
            </div>
            <div className="animate-fade-in-up opacity-0 animation-delay-300">
                <MaterialCard name={"Metal"} icons={<FaRegCalendarCheck />} des={"We buy iron, copper, aluminum, and brass. Get accurate weighing with our digital scales."} clr={"bg-teal-600"} />
            </div>
            <div className="animate-fade-in-up opacity-0 animation-delay-400">
                <MaterialCard name={"E-Waste"} icons={<FaRupeeSign />} des={"Old smartphones, laptops, circuit boards, and other electronics. Let's recycle tech responsibly."} clr={"bg-purple-600"} />
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full py-24 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="max-w-[1280px] w-full flex flex-col items-center mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up opacity-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-5">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-gray-500 max-w-2xl text-lg font-medium leading-relaxed">
              Turn your scrap into wealth in four simple steps. Efficient, transparent, and rewarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl items-stretch">
            <div className="animate-fade-in-up opacity-0 animation-delay-100 h-full">
              <WorkCard names={"Upload Photo"} icon={<IoCloudUploadOutline />} desc={"Take a photo of your scrap and upload it. Our system will analyze it immediately."} clrs={"bg-blue-600"} />
            </div>
            <div className="animate-fade-in-up opacity-0 animation-delay-200 h-full">
              <WorkCard names={"AI Checks"} icon={<FaTrain />} desc={"The AI identifies the material type and provides an estimated value based on current rates."} clrs={"bg-orange-600"} />
            </div>
            <div className="animate-fade-in-up opacity-0 animation-delay-300 h-full">
              <WorkCard names={"Book Pickup"} icon={<GiMetalScales />} desc={"Schedule a convenient time for our rider to visit your location for inspection and weighing."} clrs={"bg-teal-600"} />
            </div>
            <div className="animate-fade-in-up opacity-0 animation-delay-400 h-full">
              <WorkCard names={"Weight & Payment"} icon={<BsLaptop />} desc={"Get instant digital payment or cash as soon as the material is verified at your doorstep."} clrs={"bg-purple-600"} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
