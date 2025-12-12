import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const Orders = () => {
    const { orders, updateOrderStatus } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [scheduleData, setScheduleData] = useState({
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: ''
    });

    const handleStatusChange = (id, newStatus) => {
        if (newStatus === 'Scheduled') {
            setSelectedOrderId(id);
            setIsModalOpen(true);
        } else {
            updateOrderStatus(id, newStatus);
        }
    };

    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        const { startDate, endDate, startTime, endTime } = scheduleData;

        const start = new Date(startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        const end = new Date(endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

        const pickupTime = `${start} - ${end}, ${startTime} to ${endTime}`;

        updateOrderStatus(selectedOrderId, 'Scheduled', { pickupTime });
        setIsModalOpen(false);
        setScheduleData({ startDate: '', endDate: '', startTime: '', endTime: '' });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Orders</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Material</th>
                                <th className="px-6 py-4">Weight</th>
                                <th className="px-6 py-4">Est. Amount</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                                        <td className="px-6 py-4 text-gray-600">{order.customerName || 'Guest'}</td>
                                        <td className="px-6 py-4 text-gray-800">{order.materialName}</td>
                                        <td className="px-6 py-4 text-gray-600">{order.weight} kg</td>
                                        <td className="px-6 py-4 font-bold text-primary">{order.amount} PKR</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                                                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            {order.status === 'Pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(order.id, 'Scheduled')}
                                                        className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                                                    >
                                                        Accept & Schedule
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(order.id, 'Cancelled')}
                                                        className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 'Scheduled' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(order.id, 'Completed')}
                                                        className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                                                    >
                                                        Confirm & Pay
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(order.id, 'Cancelled')}
                                                        className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 'Completed' || order.status === 'Cancelled' ? (
                                                <span className="text-xs text-gray-400 italic">No actions</span>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Scheduling Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FaCalendarAlt className="text-primary" /> Schedule Pickup
                        </h3>
                        <form onSubmit={handleScheduleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={scheduleData.startDate}
                                        onChange={(e) => setScheduleData({ ...scheduleData, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={scheduleData.endDate}
                                        onChange={(e) => setScheduleData({ ...scheduleData, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                    <input
                                        type="time"
                                        required
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={scheduleData.startTime}
                                        onChange={(e) => setScheduleData({ ...scheduleData, startTime: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                    <input
                                        type="time"
                                        required
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={scheduleData.endTime}
                                        onChange={(e) => setScheduleData({ ...scheduleData, endTime: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark shadow-lg shadow-primary/30"
                                >
                                    Confirm Schedule
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
