import React from 'react';
import { FaRocket, FaEye } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InfoCard from '../components/InfoCard';
import logo from '../assets/assets/images/recycle.png';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-[120px] pb-20 px-4 text-center bg-gradient-to-br from-primary to-[#0b8c80] text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                <div className="max-w-[1280px] mx-auto relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">About RecycoTrack</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 font-light">
                        Building a sustainable future through smart recycling solutions.
                    </p>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="py-16 px-4 max-w-[1280px] mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <img
                            src={logo}
                            alt="RecycoTrack Mission"
                            className="w-full max-w-md mx-auto object-contain drop-shadow-xl"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary text-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                                <FaRocket />
                            </div>
                            <h2 className="text-2xl font-bold text-secondary mb-3">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed">
                                To revolutionize the scrap industry by providing a transparent, efficient, and technology-driven platform that connects sellers with certified recyclers, ensuring fair value and promoting environmental sustainability.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 text-secondary text-2xl group-hover:bg-secondary group-hover:text-white transition-colors">
                                <FaEye />
                            </div>
                            <h2 className="text-2xl font-bold text-secondary mb-3">Our Vision</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We envision a world where recycling is effortless and rewarding. By leveraging AI and digital solutions, we aim to minimize waste and maximize resource recovery, contributing to a cleaner and greener planet for future generations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Card Section */}
            <div className="bg-white">
                <InfoCard />
            </div>

            {/* Map Section */}
            <div className="py-16 px-4 max-w-[1280px] mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-secondary mb-4">Visit Our Center</h2>
                    <p className="text-gray-600">Find us at our central processing facility.</p>
                </div>
                <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg border-4 border-white">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.383577396366!2d73.1042573151306!3d30.65126598166567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b62cd838b355%3A0x6288e7275046258!2sSahiwal%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1648484848484!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="RecycoTrack Location"
                    ></iframe>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;
