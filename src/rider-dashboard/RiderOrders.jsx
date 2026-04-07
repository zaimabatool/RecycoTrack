import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FaCalendarAlt, FaClock, FaEye, FaCheckDouble, FaTimes, FaMapMarkerAlt, FaPhoneAlt, FaShoppingCart } from 'react-icons/fa';

const RiderOrders = () => {
    const { orders, updateOrderStatus, finalizeOrder } = useData();
    const [viewOrder, setViewOrder] = useState(null);
    const [finalizeOrderState, setFinalizeOrderState] = useState(null);
    const [finalData, setFinalData] = useState({ weight: '', price: '' });

    // Filter orders relevant for the rider (Scheduled for pickup)
    const riderOrders = orders.filter(order => 
        ['Scheduled', 'Price Accepted', 'Price Proposed'].includes(order.status)
    );

    const openFinalizeModal = (order) => {
        setFinalizeOrderState(order);
        setFinalData({ weight: order.weight, price: order.amount });
    };

    const handleFinalizeSubmit = async (e) => {
        e.preventDefault();
        await finalizeOrder(finalizeOrderState.id, {
            weight: finalData.weight,
            price: finalData.price
        });
        setFinalizeOrderState(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">My Pickups</h2>
                    <p className="text-gray-500">Manage your scheduled scrap collections</p>
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
                    <p className="text-primary font-bold text-sm">
                        Total Pickups: {riderOrders.length}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {riderOrders.length > 0 ? (
                    riderOrders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-5 lg:p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-secondary/10 text-secondary text-xs font-bold px-2 py-1 rounded">#{order.orderNumber || order.id.slice(-6).toUpperCase()}</span>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                order.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                                                order.status === 'Price Accepted' ? 'bg-teal-100 text-teal-700' :
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">{order.customerName || 'Customer'}</h3>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <FaMapMarkerAlt className="text-red-400" /> {order.address || 'Address not specified'}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-4 pt-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                                                <FaCalendarAlt className="text-primary" />
                                                <span className="font-medium">{order.pickupTime || 'Not set'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                                                <FaClock className="text-secondary" />
                                                <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:border-l lg:border-gray-100 lg:pl-8">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Estimated Value</p>
                                            <p className="text-2xl font-black text-primary">{order.amount} <span className="text-sm font-normal text-gray-500">PKR</span></p>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setViewOrder(order)}
                                                className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                                                title="View Details"
                                            >
                                                <FaEye />
                                            </button>
                                            {order.status === 'Scheduled' && (
                                                <button
                                                    onClick={() => openFinalizeModal(order)}
                                                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                                                >
                                                    <FaCheckDouble /> Finalize
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaShoppingCart className="text-3xl text-gray-200" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Safe & Clear!</h3>
                        <p className="text-gray-500">No scheduled pickups assigned to you at the moment.</p>
                    </div>
                )}
            </div>

            {/* Finalize Modal (Same as Admin) */}
            {finalizeOrderState && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-primary/5 p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                                <FaCheckDouble className="text-primary" /> Finalize Collection
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Update the actual weight and price after collection.
                            </p>
                        </div>

                        <form onSubmit={handleFinalizeSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Final Weight (kg)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.1"
                                        required
                                        className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold text-lg"
                                        placeholder="0.0"
                                        value={finalData.weight}
                                        onChange={(e) => setFinalData({ ...finalData, weight: e.target.value })}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">KG</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Final Price (PKR)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        required
                                        className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold text-lg text-primary"
                                        placeholder="0"
                                        value={finalData.price}
                                        onChange={(e) => setFinalData({ ...finalData, price: e.target.value })}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">PKR</span>
                                </div>
                            </div>

                            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                                <div className="text-amber-500 mt-0.5"><FaClock /></div>
                                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                                    <span className="font-bold">Important:</span> If prices differ from original estimate, the customer will receive an update notification.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setFinalizeOrderState(null)}
                                    className="flex-1 py-4 rounded-2xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark shadow-xl shadow-primary/30 transition-all transform active:scale-95"
                                >
                                    Complete Collection
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Details Modal (Simplified) */}
            {viewOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 relative">
                        <button
                            onClick={() => setViewOrder(null)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all z-10"
                        >
                            <FaTimes />
                        </button>

                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl text-primary"><FaEye /></div>
                                Pickup Details
                            </h3>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Customer</p>
                                        <p className="font-bold text-gray-800 text-lg">{viewOrder.customerName}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Order #</p>
                                        <p className="font-bold text-gray-800 text-lg">#{viewOrder.orderNumber || viewOrder.id.slice(-6).toUpperCase()}</p>
                                    </div>
                                </div>

                                <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 space-y-3">
                                    <h4 className="font-bold text-secondary flex items-center gap-2 pb-2 border-b border-primary/20">
                                        <FaMapMarkerAlt className="text-primary" /> Location Info
                                    </h4>
                                    <p className="text-gray-800 text-sm font-bold bg-white p-3 rounded-xl border border-primary/10 shadow-sm leading-relaxed">
                                        {viewOrder.address || 'Address not provided'}
                                    </p>
                                    <a 
                                        href={`tel:${viewOrder.customerPhone}`}
                                        className="w-full py-3 bg-white border border-primary/20 rounded-xl text-primary font-bold flex items-center justify-center gap-2 text-sm hover:bg-primary hover:text-white transition-all shadow-sm"
                                    >
                                        <FaPhoneAlt /> Call Customer ({viewOrder.customerPhone})
                                    </a>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-800 mb-3 px-1">Items to Collect</h4>
                                    <div className="space-y-3">
                                        {viewOrder.items && viewOrder.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-white border border-gray-100 p-4 rounded-2xl">
                                                <div>
                                                    <p className="font-bold text-gray-800">{item.material}</p>
                                                    <p className="text-xs text-gray-500 font-medium">Estimated: {item.weight || item.detectedWeight} {item.unit}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-primary">{Math.round((item.weight || item.detectedWeight) * item.price)} PKR</p>
                                                    <p className="text-[10px] text-gray-400">@{item.price}/unit</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="bg-secondary text-white p-5 rounded-2xl shadow-xl shadow-secondary/20 flex justify-between items-center">
                                        <span className="font-bold opacity-80 uppercase tracking-widest text-xs">Total Estimate</span>
                                        <span className="text-2xl font-black">{viewOrder.amount} PKR</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RiderOrders;
