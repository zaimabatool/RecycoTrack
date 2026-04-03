import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { FaShoppingCart, FaList, FaUsers, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
    const { rates, orders, apiCall } = useData();
    const [statsData, setStatsData] = React.useState({
        totalOrders: 0,
        activeRates: 0,
        totalUsers: 0,
        todayRevenue: 0
    });

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await apiCall('/admin/dashboard');
                setStatsData(data.stats);
            } catch (err) {
                console.error('Failed to fetch admin stats');
            }
        };
        fetchStats();
    }, [apiCall]);

    const stats = [
        { label: 'Total Orders', value: statsData.totalOrders, icon: <FaShoppingCart />, color: 'bg-blue-500' },
        { label: 'Active Rates', value: statsData.activeRates, icon: <FaList />, color: 'bg-green-500' },
        { label: 'Total Users', value: statsData?.totalUsers || 0, icon: <FaUsers />, color: 'bg-purple-500' },
        { label: "Today's Revenue", value: `${(statsData?.todayRevenue || 0).toLocaleString()} PKR`, icon: <FaChartLine />, color: 'bg-orange-500' },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">All Scrap Requests</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.orderNumber || order.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{order.customerName || 'Guest User'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                                                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-800">{order.amount || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No recent orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
