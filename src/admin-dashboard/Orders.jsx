import React from 'react';
import { useData } from '../context/DataContext';

const Orders = () => {
    const { orders, updateOrderStatus } = useData();

    const handleStatusChange = (id, newStatus) => {
        updateOrderStatus(id, newStatus);
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
                                                        onClick={() => handleStatusChange(order.id, 'Completed')}
                                                        className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(order.id, 'Cancelled')}
                                                        className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {order.status !== 'Pending' && (
                                                <span className="text-xs text-gray-400 italic">No actions</span>
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
        </div>
    );
};

export default Orders;
