import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { FaChartLine, FaFilter, FaCalendarAlt } from 'react-icons/fa';

const Revenue = () => {
    const { orders } = useData();
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    // Filter completed orders
    const completedOrders = useMemo(() => {
        return orders.filter(order => order.status === 'Completed');
    }, [orders]);

    // Filter by date range
    const filteredOrders = useMemo(() => {
        return completedOrders.filter(order => {
            if (!dateRange.start && !dateRange.end) return true;
            const orderDate = new Date(order.date);
            const start = dateRange.start ? new Date(dateRange.start) : new Date('1970-01-01');
            const end = dateRange.end ? new Date(dateRange.end) : new Date();
            end.setHours(23, 59, 59, 999); // Include the end day
            return orderDate >= start && orderDate <= end;
        });
    }, [completedOrders, dateRange]);

    // Calculate Total Revenue
    const totalRevenue = useMemo(() => {
        return filteredOrders.reduce((sum, order) => sum + (parseFloat(order.amount) || 0), 0);
    }, [filteredOrders]);

    // Calculate Daily Revenue
    const dailyRevenue = useMemo(() => {
        const daily = {};
        filteredOrders.forEach(order => {
            const date = new Date(order.date).toLocaleDateString();
            daily[date] = (daily[date] || 0) + (parseFloat(order.amount) || 0);
        });
        return Object.entries(daily).sort((a, b) => new Date(b[0]) - new Date(a[0])); // Sort descending
    }, [filteredOrders]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Revenue Analytics</h2>
                    <p className="text-gray-500">Track your earnings and financial performance</p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                    <FaFilter className="text-gray-400 ml-2" />
                    <input
                        type="date"
                        className="p-2 rounded-lg text-sm border-none focus:ring-0 text-gray-600 outline-none"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                    <span className="text-gray-400">-</span>
                    <input
                        type="date"
                        className="p-2 rounded-lg text-sm border-none focus:ring-0 text-gray-600 outline-none"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-linear-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <FaChartLine />
                        </div>
                        <span className="font-medium opacity-90">Total Revenue</span>
                    </div>
                    <h3 className="text-3xl font-bold">{totalRevenue.toLocaleString()} PKR</h3>
                    <p className="text-sm opacity-75 mt-1">{filteredOrders.length} Completed Orders</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <p className="text-gray-500 text-sm font-medium mb-1">Average Order Value</p>
                    <h3 className="text-2xl font-bold text-gray-800">
                        {filteredOrders.length > 0
                            ? Math.round(totalRevenue / filteredOrders.length).toLocaleString()
                            : 0} PKR
                    </h3>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <p className="text-gray-500 text-sm font-medium mb-1">Selected Period</p>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <FaCalendarAlt className="text-primary" />
                        {dateRange.start ? new Date(dateRange.start).toLocaleDateString() : 'Start'}
                        {' - '}
                        {dateRange.end ? new Date(dateRange.end).toLocaleDateString() : 'End'}
                    </h3>
                </div>
            </div>

            {/* Daily Revenue Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">Daily Breakdown</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Orders Count</th>
                                <th className="px-6 py-4 text-right">Revenue Generated</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {dailyRevenue.length > 0 ? (
                                dailyRevenue.map(([date, amount]) => (
                                    <tr key={date} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {filteredOrders.filter(o => new Date(o.date).toLocaleDateString() === date).length}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">
                                            {amount.toLocaleString()} PKR
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                                        No revenue data found for the selected period.
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

export default Revenue;
