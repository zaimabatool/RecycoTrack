import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FaCalendarAlt, FaClock, FaEye, FaCheckDouble, FaTimes } from 'react-icons/fa';

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

    // Negotiation State
    const [viewOrder, setViewOrder] = useState(null);
    const [finalizeOrder, setFinalizeOrder] = useState(null);
    const [finalData, setFinalData] = useState({ weight: '', price: '' });

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

    const openFinalizeModal = (order) => {
        setFinalizeOrder(order);
        setFinalData({ weight: order.weight, price: order.amount });
    };

    const handleFinalizeSubmit = (e) => {
        e.preventDefault();
        // Check if values changed
        if (parseFloat(finalData.price) !== parseFloat(finalizeOrder.amount) || parseFloat(finalData.weight) !== parseFloat(finalizeOrder.weight)) {
            updateOrderStatus(finalizeOrder.id, 'Price Proposed', {
                finalWeight: finalData.weight,
                finalPrice: finalData.price,
                originalPrice: finalizeOrder.amount,
                originalWeight: finalizeOrder.weight
            });
        } else {
            updateOrderStatus(finalizeOrder.id, 'Completed');
        }
        setFinalizeOrder(null);
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
                                                        order.status === 'Price Accepted' ? 'bg-teal-100 text-teal-700' :
                                                            'bg-red-100 text-red-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => setViewOrder(order)}
                                                className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                                                title="View Details"
                                            >
                                                <FaEye />
                                            </button>
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
                                                        onClick={() => openFinalizeModal(order)}
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
                                            {order.status === 'Price Proposed' && (
                                                <span className="text-xs text-orange-500 font-bold">Proposal Sent</span>
                                            )}
                                            {order.status === 'Price Rejected' && (
                                                <div className="flex gap-1 justify-end">
                                                    <button
                                                        onClick={() => handleStatusChange(order.id, 'Cancelled')}
                                                        className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => openFinalizeModal(order)}
                                                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                                                    >
                                                        Retry
                                                    </button>
                                                </div>
                                            )}
                                            {order.status === 'Price Accepted' && (
                                                <button
                                                    onClick={() => handleStatusChange(order.id, 'Completed')}
                                                    className="text-xs bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition-colors flex items-center gap-1"
                                                >
                                                    <FaCheckDouble /> Complete Order
                                                </button>
                                            )}
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

            {/* View Details Modal */}
            {
                viewOrder && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in duration-200 relative">
                            <button
                                onClick={() => setViewOrder(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <FaTimes />
                            </button>
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FaEye className="text-primary" /> Order Details #{viewOrder.id}
                            </h3>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-xl">
                                        <p className="text-xs text-gray-500">Customer</p>
                                        <p className="font-bold text-gray-800">{viewOrder.customerName}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-xl">
                                        <p className="text-xs text-gray-500">Date</p>
                                        <p className="font-bold text-gray-800">{new Date(viewOrder.date).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="font-bold text-gray-700 mb-2">Items</h4>
                                    {viewOrder.items && viewOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl mb-2">
                                            <div>
                                                <p className="font-bold text-gray-800">{item.material}</p>
                                                <p className="text-xs text-gray-500">{item.weight || item.detectedWeight} {item.unit} @ {item.price} PKR</p>
                                            </div>
                                            <p className="font-bold text-primary">
                                                {Math.round((item.weight || item.detectedWeight) * item.price)} PKR
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="font-bold text-gray-700 mb-2">Payment Info</h4>
                                    <div className="bg-blue-50 p-4 rounded-xl">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-600">Method:</span>
                                            <span className="font-bold capitalize">{viewOrder.paymentMethod}</span>
                                        </div>
                                        {viewOrder.paymentMethod === 'online' && viewOrder.paymentDetails && (
                                            <>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-gray-600">Account:</span>
                                                    <span className="font-medium">{viewOrder.paymentDetails.accountNumber}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Name:</span>
                                                    <span className="font-medium">{viewOrder.paymentDetails.accountName}</span>
                                                </div>
                                            </>
                                        )}
                                        <div className="border-t border-blue-200 mt-3 pt-2 flex justify-between items-center">
                                            <span className="text-blue-800 font-bold">Total Amount:</span>
                                            <span className="text-xl font-bold text-blue-900">{viewOrder.amount} PKR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Finalize / Negotiate Modal */}
            {
                finalizeOrder && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FaCheckDouble className="text-green-500" /> Finalize Order
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Verify the final weight and price. Changing these values will send a proposal to the user for approval.
                            </p>

                            <form onSubmit={handleFinalizeSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Final Weight (kg)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        required
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
                                        value={finalData.weight}
                                        onChange={(e) => setFinalData({ ...finalData, weight: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Final Price (PKR)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
                                        value={finalData.price}
                                        onChange={(e) => setFinalData({ ...finalData, price: e.target.value })}
                                    />
                                </div>

                                <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800">
                                    <span className="font-bold">Note:</span> If you change the price, the status will change to "Price Proposed" and the user must accept it.
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setFinalizeOrder(null)}
                                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg shadow-green-600/30"
                                    >
                                        {parseFloat(finalData.price) !== parseFloat(finalizeOrder.amount) ? 'Send Proposal' : 'Complete Order'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </div >
    );
};

export default Orders;
