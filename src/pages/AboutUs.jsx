import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InfoCard from '../components/InfoCard';
import logo from '../assets/assets/images/recycle.png';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-[100px] pb-10 px-4 text-center bg-[#0e9d90] text-white">
                <div className="max-w-[1280px] mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About RecycoTrack</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
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
                    <div className="w-full md:w-1/2 space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold text-[#082b5c] mb-3">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed">
                                To revolutionize the scrap industry by providing a transparent, efficient, and technology-driven platform that connects sellers with certified recyclers, ensuring fair value and promoting environmental sustainability.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-[#082b5c] mb-3">Our Vision</h2>
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
                    <h2 className="text-3xl font-bold text-[#082b5c] mb-4">Visit Our Center</h2>
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
