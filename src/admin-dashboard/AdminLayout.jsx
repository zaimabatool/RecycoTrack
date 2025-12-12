import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaList, FaShoppingCart, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { path: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
        { path: '/admin/rates', label: 'Manage Rates', icon: <FaList /> },
        { path: '/admin/orders', label: 'Orders', icon: <FaShoppingCart /> },
        { path: '/admin/history', label: 'History', icon: <FaHistory /> },
    ];

    const handleLogout = () => {
        // Add logout logic here (clear token, etc.)
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-secondary text-white flex flex-col shadow-xl">
                <div className="p-6 border-b border-white/10 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white">R</div>
                    <h1 className="text-xl font-bold tracking-wide">RecycoAdmin</h1>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all"
                    >
                        <FaSignOutAlt />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
                    <h2 className="text-xl font-bold text-gray-800">
                        {menuItems.find(item => item.path === location.pathname)?.label || 'Admin Panel'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-700">Admin User</p>
                            <p className="text-xs text-gray-500">admin@recycotrack.com</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
