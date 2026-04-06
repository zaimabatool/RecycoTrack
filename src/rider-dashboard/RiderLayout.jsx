import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUserEdit, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import { renderAvatar } from '../utils/avatarHelper';

const RiderLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = useData();

    // Protect Rider Route
    React.useEffect(() => {
        if (!currentUser || currentUser.role !== 'rider') {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    if (!currentUser || currentUser.role !== 'rider') return null;

    const menuItems = [
        { path: '/rider', label: 'My Pickups', icon: <FaShoppingCart /> },
        { path: '/rider/profile', label: 'Edit Profile', icon: <FaUserEdit /> },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    // Close sidebar on route change (mobile)
    React.useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-secondary text-white flex flex-col shadow-xl 
                transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white shadow-lg">R</div>
                        <h1 className="text-xl font-bold tracking-wide">RiderPanel</h1>
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
                        <FaBars />
                    </button>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === item.path || (item.path !== '/rider' && location.pathname.startsWith(item.path))
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
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all font-medium"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Header */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Button for Mobile */}
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
                        >
                            <FaBars className="text-xl" />
                        </button>
                        <h2 className="text-lg lg:text-xl font-bold text-gray-800 truncate max-w-[150px] md:max-w-none">
                            {menuItems.find(item => item.path === location.pathname)?.label || 'Rider Dashboard'}
                        </h2>
                    </div>

                    <div 
                        onClick={() => navigate('/rider/profile')}
                        className="flex items-center gap-3 lg:gap-4 hover:bg-gray-50 p-1.5 rounded-2xl cursor-pointer transition-all group"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-700 leading-tight group-hover:text-primary transition-colors">{currentUser.name}</p>
                            <p className="text-[10px] lg:text-xs text-gray-500">Rider Account</p>
                        </div>
                        <div className="w-9 h-9 lg:w-10 lg:h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold border border-primary/20 shadow-sm text-lg group-hover:scale-105 transition-transform">
                            {renderAvatar(currentUser.avatar)}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#f8fafc]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default RiderLayout;
