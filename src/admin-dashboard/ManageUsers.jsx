import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FaUsers, FaPlus, FaTrash, FaUserPlus, FaEnvelope, FaPhone, FaLock, FaTimes, FaCheckDouble, FaEye, FaEyeSlash } from 'react-icons/fa';
import { renderAvatar } from '../utils/avatarHelper';

const ManageUsers = () => {
    const { users, addUser, updateUser, deleteUser } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
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

    const handleOpenModal = (user = null) => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                password: '' 
            });
            setEditMode(true);
            setCurrentUserId(user.id);
        } else {
            setFormData({ name: '', email: '', phone: '', password: '' });
            setEditMode(false);
            setCurrentUserId(null);
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
                const submitData = { ...formData };
                if (!submitData.password) delete submitData.password;
                result = await updateUser(currentUserId, submitData);
            } else {
                result = await addUser(formData);
            }

            if (result.success) {
                setSuccess(editMode ? 'User profile updated!' : 'User account created successfully!');
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 1500);
            } else {
                setError(result.message || `Failed to ${editMode ? 'update' : 'create'} user`);
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete user ${name}? This action cannot be undone.`)) {
            try {
                await deleteUser(id);
            } catch (err) {
                alert(err.message || 'Failed to delete user');
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header with Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-3xl shadow-inner">
                        <FaUsers />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-secondary tracking-tight">Manage Customers</h1>
                        <p className="text-gray-500 font-medium">Oversee your customer base and manage their profiles.</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 text-center">
                        <span className="block text-2xl font-black text-secondary">{users.length}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Customers</span>
                    </div>
                    <button 
                        onClick={() => handleOpenModal()}
                        className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 active:scale-95 group"
                    >
                        <FaPlus className="group-hover:rotate-90 transition-transform" />
                        Create New User
                    </button>
                </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.id} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                            
                            <div className="flex items-start gap-5 relative z-10">
                                <div className="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary font-bold text-2xl border border-secondary/10 group-hover:scale-110 transition-transform">
                                    {renderAvatar(user.avatar)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-secondary text-lg truncate mb-1">{user.name}</h3>
                                    <p className="text-primary font-bold text-xs uppercase tracking-wider mb-3">Customer</p>
                                    
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <FaEnvelope className="shrink-0 text-gray-300" />
                                            <span className="truncate">{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <FaPhone className="shrink-0 text-gray-300" />
                                            <span>{user.phone || 'No phone added'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between relative z-10">
                                <span className="text-[10px] font-bold text-gray-400 italic">Registered {new Date(user.createdAt).toLocaleDateString()}</span>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleOpenModal(user)}
                                        className="p-3 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95"
                                        title="Edit User Details"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(user.id, user.name)}
                                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
                                        title="Delete User Account"
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
                            <FaUsers />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No customers found</h3>
                        <p className="text-gray-500 max-w-sm mb-8">Wait for users to sign up or manually create a user account.</p>
                        <button 
                            onClick={() => handleOpenModal()}
                            className="bg-primary/10 text-primary px-8 py-4 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all"
                        >
                            Create User
                        </button>
                    </div>
                )}
            </div>

            {/* User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-secondary/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-300 relative">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <FaTimes />
                        </button>

                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner tracking-tighter">
                                {editMode ? <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg> : <FaUserPlus />}
                            </div>
                            <h2 className="text-3xl font-black text-secondary tracking-tight">{editMode ? 'Edit User' : 'New Customer'}</h2>
                            <p className="text-gray-500 font-medium">{editMode ? 'Update account details.' : 'Manually create a new customer account.'}</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold flex items-center gap-3 rounded-r-xl">
                                <FaTimes className="shrink-0" />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm font-bold flex items-center gap-3 rounded-r-xl">
                                <FaCheckDouble className="shrink-0" />
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. John Doe"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:outline-none transition-all font-bold text-secondary"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="customer@email.com"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:outline-none transition-all font-bold text-secondary"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <div className="relative">
                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input
                                        type="tel"
                                        required
                                        placeholder="0300-0000000"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:outline-none transition-all font-bold text-secondary"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">{editMode ? 'New Password (Optional)' : 'Account Password'}</label>
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required={!editMode}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:outline-none transition-all font-bold text-secondary"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors focus:outline-none"
                                        title={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </button>
                                </div>
                                {editMode && (
                                    <p className="text-[10px] text-gray-400 italic px-1">Leave blank to keep existing password.</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 active:scale-95 disabled:opacity-50 mt-4"
                            >
                                {loading ? (editMode ? 'Updating...' : 'Creating...') : (editMode ? 'Save Changes' : 'Confirm & Create Account')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
