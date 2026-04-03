import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaTransgender, FaSave, FaArrowLeft, FaCheckCircle, FaExclamationCircle, FaShieldAlt, FaIdCard, FaPencilAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ALL_AVATARS, renderAvatar } from '../utils/avatarHelper';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, updateProfile } = useData();

    const isAdminContext = location.pathname.startsWith('/admin');
    const pickerRef = useRef(null);

    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        gender: currentUser?.gender || 'Prefer not to say',
        avatar: currentUser?.avatar || 'FaUser',
        password: '',
        confirmPassword: ''
    });

    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsPickerOpen(false);
            }
        };
        if (isPickerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isPickerOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (status.message) setStatus({ type: '', message: '' });
    };

    const handleAvatarSelect = (avatarName) => {
        setFormData({ ...formData, avatar: avatarName });
        if (status.message) setStatus({ type: '', message: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password && formData.password !== formData.confirmPassword) {
            setStatus({ type: 'error', message: 'Passwords do not match!' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        const updateData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            gender: formData.gender,
            avatar: formData.avatar
        };
        if (formData.password) updateData.password = formData.password;

        const result = await updateProfile(updateData);

        if (result.success) {
            setStatus({ type: 'success', message: 'Profile updated successfully!' });
            setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
            setIsPickerOpen(false);
        } else {
            setStatus({ type: 'error', message: result.message || 'Failed to update profile' });
        }
        setIsSubmitting(false);
    };

    return (
        <div className={`
            bg-[#f0f9f8] min-h-[calc(100vh-70px)] pb-20 px-4 font-sans overflow-x-hidden
            ${isAdminContext ? 'pt-0 bg-transparent min-h-0' : 'pt-16'}
        `}>
            <div className={`max-w-[1280px] mx-auto space-y-12 animate-fade-in-up ${isAdminContext ? 'mt-4' : ''}`}>
                
                {/* Header Section */}
                {!isAdminContext && (
                    <div className="flex items-center justify-between px-4">
                        <div className="animate-fade-in-left">
                            <button 
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-all group mb-4"
                            >
                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
                                <span className="tracking-wide uppercase text-xs">Back</span>
                            </button>
                            <h1 className="text-3xl md:text-5xl font-black text-secondary tracking-tight mb-2">Edit Profile</h1>
                            <p className="text-gray-500 font-medium text-base md:text-lg">Customize your digital identity and settings.</p>
                        </div>
                    </div>
                )}

                <div className="relative">
                    {/* Decorative Top Banner - Fully Responsive Integrated Background */}
                    <div className="h-32 md:h-64 relative rounded-none md:rounded-[3rem] shadow-2xl shadow-primary/10 overflow-visible mb-16 md:mb-32 group/banner">
                        
                        {/* Background Image Layer with aggressive fill */}
                        <div className="absolute inset-0 rounded-none md:rounded-[3rem] overflow-hidden bg-primary">
                            <img 
                                src="/profile_banner.png?v=2" 
                                alt="Decorative Banner" 
                                className="w-full h-full absolute inset-0 object-cover scale-[1.05] transition-transform duration-1000 group-hover/banner:scale-110"
                            />
                            {/* Texture Pattern Layer */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            
                            {/* Enhanced Gradient Overlays */}
                            <div className="absolute inset-0 bg-linear-to-r from-primary/30 to-secondary/30 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/20"></div>
                        </div>
                        
                        <div className="absolute -bottom-10 md:-bottom-16 left-6 md:left-12">
                            <div className="relative group/avatar" ref={pickerRef}>
                                <div className="w-28 h-28 md:w-40 md:h-40 rounded-3xl md:rounded-4xl bg-white p-1.5 md:p-2 shadow-2xl transition-all duration-700 hover:rotate-2 group-hover:scale-105">
                                    <div className="w-full h-full rounded-2xl md:rounded-[2rem] bg-secondary flex items-center justify-center text-4xl md:text-6xl font-black text-primary border-4 border-primary/10 shadow-inner overflow-hidden">
                                        {renderAvatar(formData.avatar)}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsPickerOpen(!isPickerOpen)}
                                    className="absolute bottom-1 md:bottom-2 -right-1 md:-right-2 w-9 h-9 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl shadow-2xl border border-gray-50 flex items-center justify-center text-primary text-sm md:text-lg hover:scale-110 active:scale-95 transition-all z-10 hover:bg-primary hover:text-white"
                                    title="Change Avatar"
                                >
                                    <FaPencilAlt />
                                </button>

                                {/* Avatar Picker Overlay */}
                                {isPickerOpen && (
                                    <div className="absolute top-[110%] left-0 right-0 md:left-44 md:right-auto md:w-[450px] bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/50 animate-fade-in-up z-20 mx-auto w-[calc(100vw-40px)] max-w-[320px] md:max-w-none">
                                        <div className="flex items-center gap-3 mb-2 px-1">
                                            <p className="text-[10px] font-black text-secondary uppercase tracking-[2px]">Select New Icon</p>
                                            <div className="h-px grow bg-gray-100"></div>
                                        </div>
                                        <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
                                            {ALL_AVATARS.map((avatarName) => (
                                                <button
                                                    key={avatarName}
                                                    type="button"
                                                    onClick={() => handleAvatarSelect(avatarName)}
                                                    className={`
                                                        shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300
                                                        ${formData.avatar === avatarName 
                                                            ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30 ring-4 ring-primary/10' 
                                                            : 'bg-white/50 text-gray-400 hover:bg-white hover:text-secondary border border-gray-100'
                                                        }
                                                    `}
                                                >
                                                    {renderAvatar(avatarName)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="px-4">
                        {status.message && (
                            <div className={`mb-10 p-6 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 ${
                                status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                            }`}>
                                <div className={`p-2 rounded-full ${status.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                                    {status.type === 'success' ? <FaCheckCircle className="text-xl" /> : <FaExclamationCircle className="text-xl" />}
                                </div>
                                <p className="font-bold text-lg">{status.message}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* Section: Personal Info */}
                            <div className="bg-white/40 backdrop-blur-sm rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 border border-white/60 shadow-xl shadow-gray-200/50">
                                <div className="flex items-center gap-4 mb-8 md:mb-10 pb-4 border-b border-gray-100/50">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center text-white text-xl">
                                        <FaIdCard />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">Personal Information</h2>
                                        <p className="text-gray-400 text-xs md:text-sm font-medium tracking-wide italic">Update your public profile details</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                    <div className="group space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] ml-1 group-focus-within:text-primary transition-colors">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-14 pr-8 py-5 rounded-3xl bg-white/50 border-2 border-transparent focus:border-primary/20 focus:bg-white focus:outline-none transition-all font-bold text-secondary placeholder:text-gray-300 shadow-sm group-hover:shadow-md text-lg"
                                                placeholder="Enter full name"
                                            />
                                        </div>
                                    </div>

                                    <div className="group space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] ml-1 group-focus-within:text-primary transition-colors">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-14 pr-8 py-5 rounded-3xl bg-white/50 border-2 border-transparent focus:border-primary/20 focus:bg-white focus:outline-none transition-all font-bold text-secondary placeholder:text-gray-300 shadow-sm group-hover:shadow-md text-lg"
                                                placeholder="Enter email"
                                            />
                                        </div>
                                    </div>

                                    <div className="group space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] ml-1 group-focus-within:text-primary transition-colors">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <FaPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-14 pr-8 py-5 rounded-3xl bg-white/50 border-2 border-transparent focus:border-primary/20 focus:bg-white focus:outline-none transition-all font-bold text-secondary placeholder:text-gray-300 shadow-sm group-hover:shadow-md text-lg"
                                                placeholder="+92 300 0000000"
                                            />
                                        </div>
                                    </div>

                                    <div className="group space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] ml-1 group-focus-within:text-primary transition-colors">
                                            Gender
                                        </label>
                                        <div className="relative">
                                            <FaTransgender className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="w-full pl-14 pr-8 py-5 rounded-3xl bg-white/50 border-2 border-transparent focus:border-primary/20 focus:bg-white focus:outline-none transition-all font-bold text-secondary shadow-sm group-hover:shadow-md appearance-none cursor-pointer text-lg"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                                <option value="Prefer not to say">Prefer not to say</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section: Security */}
                            <div className="bg-white/40 backdrop-blur-sm rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 border border-white/60 shadow-xl shadow-gray-200/50">
                                <div className="flex items-center gap-4 mb-8 md:mb-10 pb-4 border-b border-gray-100/50">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/20 flex items-center justify-center text-white text-xl">
                                        <FaShieldAlt />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">Security & Privacy</h2>
                                        <p className="text-gray-400 text-xs md:text-sm font-medium tracking-wide italic">Secure your account with a strong password</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                    <div className="group space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] ml-1 group-focus-within:text-primary transition-colors">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full pl-14 pr-14 py-5 rounded-3xl bg-white/50 border-2 border-transparent focus:border-primary/20 focus:bg-white focus:outline-none transition-all font-bold text-secondary placeholder:text-gray-300 shadow-sm group-hover:shadow-md text-lg"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="group space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] ml-1 group-focus-within:text-primary transition-colors">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="w-full pl-14 pr-14 py-5 rounded-3xl bg-white/50 border-2 border-transparent focus:border-primary/20 focus:bg-white focus:outline-none transition-all font-bold text-secondary placeholder:text-gray-300 shadow-sm group-hover:shadow-md text-lg"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-20 bg-primary text-white rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-primary-dark transition-all shadow-[0_20px_50px_rgba(14,157,144,0.3)] active:scale-[0.98] disabled:opacity-50 group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <FaSave className={`${isSubmitting ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} text-xl md:text-2xl`} />
                                {isSubmitting ? 'Updating Profile...' : 'Save & Sync Changes'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Info Cards Grid */}
                {!isAdminContext && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white shadow-xl shadow-gray-200/40 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
                            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform shadow-inner">
                                <FaUser />
                            </div>
                            <div>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-1">Member Since</p>
                                <p className="font-black text-secondary text-xl">
                                    {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white shadow-xl shadow-gray-200/40 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
                            <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform shadow-inner">
                                <FaShieldAlt />
                            </div>
                            <div>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-1">Account Role</p>
                                <p className="font-black text-secondary text-xl capitalize">{currentUser?.role}</p>
                            </div>
                        </div>

                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white shadow-xl shadow-gray-200/40 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
                            <div className="w-16 h-16 rounded-3xl bg-green-50 text-green-500 flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform shadow-inner">
                                <FaCheckCircle />
                            </div>
                            <div>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-1">System Status</p>
                                <p className="font-black text-secondary text-xl">Verified Account</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
