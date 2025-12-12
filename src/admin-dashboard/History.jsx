import React from 'react';
import { useData } from '../context/DataContext';

const History = () => {
    const { orders } = useData();
    // Filter only completed or cancelled orders for history
    const historyOrders = orders.filter(order => order.status === 'Completed' || order.status === 'Cancelled');

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Details</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {historyOrders.length > 0 ? (
                                historyOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">#{order.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-gray-800 font-medium">{order.customerName || 'Guest'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {order.materialName} ({order.weight} kg)
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">{order.amount} PKR</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No history records found.
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

export default History;
