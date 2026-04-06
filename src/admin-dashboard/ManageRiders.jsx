import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FaMotorcycle, FaPlus, FaTrash, FaUserPlus, FaEnvelope, FaPhone, FaLock, FaTimes, FaCheckDouble, FaEye, FaEyeSlash } from 'react-icons/fa';
import { renderAvatar } from '../utils/avatarHelper';

const ManageRiders = () => {
    const { riders, addRider, updateRider, deleteRider } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentRiderId, setCurrentRiderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleOpenModal = (rider = null) => {
        if (rider) {
            setFormData({
                name: rider.name || '',
                email: rider.email || '',
                phone: rider.phone || '',
                password: '' // Reset password field for security
            });
            setEditMode(true);
            setCurrentRiderId(rider.id);
        } else {
            setFormData({ name: '', email: '', phone: '', password: '' });
            setEditMode(false);
            setCurrentRiderId(null);
        }
        setError('');
        setSuccess('');
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            let result;
            if (editMode) {
                // For editing, only send password if it was changed
                const submitData = { ...formData };
                if (!submitData.password) delete submitData.password;
                result = await updateRider(currentRiderId, submitData);
            } else {
                result = await addRider(formData);
            }

            if (result.success) {
                setSuccess(editMode ? 'Rider profile updated!' : 'Rider account created successfully!');
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 1500);
            } else {
                setError(result.message || `Failed to ${editMode ? 'update' : 'create'} rider`);
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete rider ${name}? This action cannot be undone.`)) {
            try {
                await deleteRider(id);
            } catch (err) {
                alert(err.message || 'Failed to delete rider');
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header with Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-3xl shadow-inner">
                        <FaMotorcycle />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-secondary tracking-tight">Manage Riders</h1>
                        <p className="text-gray-500 font-medium">Coordinate your pickup workforce & scale your shop.</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 text-center">
                        <span className="block text-2xl font-black text-secondary">{riders.length}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Active Riders</span>
                    </div>
                    <button 
                        onClick={() => handleOpenModal()}
                        className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 active:scale-95 group"
                    >
                        <FaPlus className="group-hover:rotate-90 transition-transform" />
                        Onboard New Rider
                    </button>
                </div>
            </div>

            {/* Riders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {riders.length > 0 ? (
                    riders.map((rider) => (
                        <div key={rider.id} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 relative overflow-hidden">
                            {/* Card Background Decoration */}
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                            
                            <div className="flex items-start gap-5 relative z-10">
                                <div className="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary font-bold text-2xl border border-secondary/10 group-hover:scale-110 transition-transform">
                                    {renderAvatar(rider.avatar)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-secondary text-lg truncate mb-1">{rider.name}</h3>
                                    <p className="text-primary font-bold text-xs uppercase tracking-wider mb-3">Rider Specialist</p>
                                    
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <FaEnvelope className="shrink-0 text-gray-300" />
                                            <span className="truncate">{rider.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <FaPhone className="shrink-0 text-gray-300" />
                                            <span>{rider.phone || 'No phone added'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between relative z-10">
                                <span className="text-[10px] font-bold text-gray-400 italic">Joined {new Date(rider.createdAt).toLocaleDateString()}</span>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleOpenModal(rider)}
                                        className="p-3 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95"
                                        title="Edit Rider Details"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(rider.id, rider.name)}
                                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
                                        title="Delete Rider Account"
                                    >
                                        <FaTrash className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center px-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6 text-3xl">
                            <FaMotorcycle />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No riders recruited yet</h3>
                        <p className="text-gray-500 max-w-sm mb-8">Your shop needs a workforce to handle pickups! Onboard your first rider today.</p>
                        <button 
                            onClick={() => handleOpenModal()}
                            className="bg-primary/10 text-primary px-8 py-4 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all"
                        >
                            Start Onboarding
                        </button>
                    </div>
                )}
            </div>

            {/* Onboarding/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-secondary/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-300 relative">
                        {/* Close Button */}
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 w-11 h-11 bg-white/50 backdrop-blur-md rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 z-10 border border-white/20 group"
                        >
                            <FaTimes className="group-hover:rotate-180 transition-transform duration-500" />
                        </button>

                        {/* Styled Header Section */}
                        <div className="text-center relative mb-10 pt-4">
                            <div className="relative inline-block mb-6">
                                <div className="absolute inset-0 bg-primary/30 rounded-[2.5rem] blur-2xl animate-pulse delay-700"></div>
                                <div className="w-24 h-24 bg-gradient-to-br from-primary via-primary-dark to-secondary text-white rounded-[2.5rem] flex items-center justify-center text-5xl relative z-10 shadow-2xl shadow-primary/40 -rotate-3 hover:rotate-0 transition-transform duration-500 ring-8 ring-white/80">
                                    {editMode ? <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                                    </svg> : <FaUserPlus className="text-white/90" />}
                                </div>
                            </div>
                            <h2 className="text-4xl font-black text-secondary tracking-tight mb-2">{editMode ? 'Update Rider' : 'New Recruit'}</h2>
                            <div className="flex items-center justify-center gap-2">
                                <div className="h-1 w-8 bg-primary/20 rounded-full"></div>
                                <p className="text-gray-500 font-bold text-sm tracking-wide uppercase italic">{editMode ? 'Modify Access & Profile' : 'Onboard Collection Expert'}</p>
                                <div className="h-1 w-8 bg-primary/20 rounded-full"></div>
                            </div>
                        </div>

                        {/* Feedback Alerts */}
                        {error && (
                            <div className="mb-8 p-4 bg-red-50/50 backdrop-blur-sm border border-red-100 text-red-600 text-xs font-black flex items-center gap-4 rounded-2xl animate-in slide-in-from-top-2">
                                <div className="w-8 h-8 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                                    <FaTimes size={14} />
                                </div>
                                <span>{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className="mb-8 p-4 bg-emerald-50/50 backdrop-blur-sm border border-emerald-100 text-emerald-600 text-xs font-black flex items-center gap-4 rounded-2xl animate-in slide-in-from-top-2">
                                <div className="w-8 h-8 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <FaCheckDouble size={14} />
                                </div>
                                <span>{success}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Inputs With Style */}
                            {[
                                { label: 'Full Name', name: 'name', icon: <FaUserPlus size={16} />, placeholder: 'e.g. John Doe', type: 'text' },
                                { label: 'Email Address', name: 'email', icon: <FaEnvelope size={16} />, placeholder: 'rider@recyco.com', type: 'email' },
                                { label: 'Phone (Optional)', name: 'phone', icon: <FaPhone size={16} />, placeholder: '0300-0000000', type: 'tel' }
                            ].map((field) => (
                                <div key={field.name} className="group/input space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-primary transition-colors">{field.label}</label>
                                    <div className="relative group/field overflow-hidden rounded-2xl shadow-sm border-2 border-gray-50 bg-gray-50 focus-within:border-primary/30 focus-within:bg-white transition-all duration-300">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-primary transition-colors">
                                            {field.icon}
                                        </div>
                                        <input
                                            type={field.type}
                                            required={field.name !== 'phone'}
                                            placeholder={field.placeholder}
                                            className="w-full pl-12 pr-4 py-4 bg-transparent outline-none font-bold text-secondary placeholder:text-gray-300 transition-all"
                                            value={formData[field.name]}
                                            onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Password Field Special Treatment */}
                            <div className="group/input space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-primary transition-colors">{editMode ? 'New Password (Optional)' : 'Temporary Password'}</label>
                                <div className="relative group/field overflow-hidden rounded-2xl shadow-sm border-2 border-blue-50/50 bg-blue-50/30 focus-within:border-primary/30 focus-within:bg-white transition-all duration-300">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-primary transition-colors">
                                        <FaLock size={16} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required={!editMode}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-transparent outline-none font-bold text-secondary placeholder:text-gray-300 transition-all font-mono tracking-widest"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/80 shadow-sm flex items-center justify-center text-gray-400 hover:text-primary hover:shadow-md transition-all active:scale-90"
                                        title={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-400 italic px-1 font-medium">
                                    {editMode ? 'Leave blank to keep existing password.' : 'Rider should change this after first login.'}
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group/btn w-full py-5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-3xl font-black text-lg shadow-xl shadow-primary/40 hover:shadow-2xl hover:shadow-primary/50 hover:-translate-y-1 active:scale-95 transition-all duration-500 disabled:grayscale disabled:opacity-50 mt-6 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 skew-x-[-20deg]"></div>
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {loading ? (editMode ? 'Syncing...' : 'Onboarding...') : (editMode ? 'Update Account' : 'Confirm & Create Rider')}
                                    {!loading && <FaCheckDouble className="group-hover/btn:translate-x-1 transition-transform" />}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageRiders;
