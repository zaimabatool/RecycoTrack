import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaRegBuilding, FaPaperPlane, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { LuTimer } from "react-icons/lu";
import { IoCallOutline } from "react-icons/io5";

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert('Message sent successfully! (Demo)');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    // FAQ Data
    const faqs = [
        {
            question: "How do I sell my scrap?",
            answer: "Simply navigate to the Rate List page, check the current rates, and use the 'Sell Now' button or contact us directly to schedule a pickup."
        },
        {
            question: "Do you provide home pickup?",
            answer: "Yes, we offer convenient home pickup services for bulk scrap. Contact us to check availability in your area."
        },
        {
            question: "How is the price calculated?",
            answer: "Prices are calculated based on the weight of the material and the current market rates displayed on our Rate List page."
        },
        {
            question: "What types of materials do you buy?",
            answer: "We buy a wide range of materials including iron, plastic, paper, copper, aluminum, and e-waste."
        }
    ];

    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-bg-light font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-[120px] pb-20 px-4 text-center bg-gradient-to-br from-primary to-[#0b8c80] text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                <div className="max-w-[1280px] mx-auto relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Contact Us</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 font-light">
                        We'd love to hear from you. Get in touch with us for any queries or support.
                    </p>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Side - Contact Form */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
                            <h2 className="text-3xl font-bold text-secondary mb-6 relative z-10">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                                        placeholder="Your message here..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <FaPaperPlane /> Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Side - Scrap Center Info (Reused Style) */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-full relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>
                            <h2 className="text-2xl font-bold text-secondary mb-8 border-b border-gray-100 pb-4 relative z-10">
                                Contact Information
                            </h2>

                            <div className="space-y-8 relative z-10">
                                <div className="flex items-start gap-4 group">
                                    <div className='w-14 h-14 rounded-2xl flex justify-center items-center bg-primary/10 text-primary shadow-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                                        <FaRegBuilding className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary text-lg mb-1">Center Name</h3>
                                        <p className="text-gray-600 leading-relaxed">RecycoTrack Scrap Center</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className='w-14 h-14 rounded-2xl flex justify-center items-center bg-primary/10 text-primary shadow-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                                        <CiLocationOn className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary text-lg mb-1">Address</h3>
                                        <p className="text-gray-600 leading-relaxed">Main Bazar Road, Sahiwal, Punjab, Pakistan</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className='w-14 h-14 rounded-2xl flex justify-center items-center bg-primary/10 text-primary shadow-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                                        <LuTimer className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary text-lg mb-1">Working Hours</h3>
                                        <p className="text-gray-600">Monday – Saturday: 8:00 AM – 6:00 PM</p>
                                        <p className="text-gray-500 text-sm mt-1">Sunday: Closed</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className='w-14 h-14 rounded-2xl flex justify-center items-center bg-primary/10 text-primary shadow-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                                        <IoCallOutline className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary text-lg mb-1">Contact</h3>
                                        <p className="text-gray-600 font-medium">+92 300 1234567</p>
                                        <p className="text-gray-600">info@recycotrack.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Find Us on Map</h2>
                    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.346738676246!2d73.1068113151322!3d30.66612098166012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b62cd8405a6d%3A0x5329555555555555!2sSahiwal%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1625123456789!5m2!1sen!2s"
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

                {/* FAQ Section */}
                <div className="mt-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <button
                                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="font-bold text-secondary text-lg">{faq.question}</span>
                                    {openFaqIndex === index ? <FaChevronUp className="text-primary" /> : <FaChevronDown className="text-gray-400" />}
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                                >
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Contact;
