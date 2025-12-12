import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useData } from '../context/DataContext';
import { FaBoxOpen, FaCheckCircle, FaClock, FaTimesCircle, FaTruck, FaExclamationTriangle } from 'react-icons/fa';

const UserOrders = () => {
    const navigate = useNavigate();
    const { orders, currentUser, updateOrderStatus } = useData();

    const handleAcceptProposal = (orderId) => {
        updateOrderStatus(orderId, 'Price Accepted');
    };

    const handleRejectProposal = (orderId) => {
        updateOrderStatus(orderId, 'Price Rejected');
    };

    // Redirect if not logged in
    React.useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    if (!currentUser) return null;

    const myOrders = orders.filter(order => order.userId === currentUser.id);

    return (
        <div className="min-h-screen bg-bg-light font-sans">
            <Navbar />

            <div className="pt-[100px] pb-20 px-4 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-secondary">
                        My Orders
                    </h1>
                    <div className="text-right">
                        <p className="font-bold text-gray-700">Welcome, {currentUser.name}</p>
                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {myOrders.length > 0 ? (
                        myOrders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
                                    {/* Order Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">#{order.id}</span>
                                            <span className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-secondary mb-1">
                                            {order.materialName}
                                        </h3>
                                        <p className="text-gray-600">
                                            Weight: <span className="font-bold">{order.weight} {order.items[0]?.unit || 'kg'}</span>
                                        </p>
                                        <p className="text-gray-600">
                                            Payment: <span className="capitalize">{order.paymentMethod}</span>
                                        </p>
                                        {order.status === 'Scheduled' && order.pickupTime && (
                                            <div className="mt-3 bg-blue-50 text-blue-800 p-3 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
                                                <FaTruck className="mt-1 shrink-0" />
                                                <div>
                                                    <p className="font-bold text-sm">Rider Scheduled</p>
                                                    <p className="text-xs">{order.pickupTime}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Status & Amount */}
                                    <div className="flex flex-col items-end justify-center gap-2">
                                        <div className="text-2xl font-bold text-primary">
                                            {order.status === 'Price Proposed' ? order.finalPrice : order.amount} PKR
                                        </div>
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                                                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {order.status === 'Completed' && <FaCheckCircle />}
                                            {order.status === 'Scheduled' && <FaTruck />}
                                            {order.status === 'Pending' && <FaClock />}
                                            {order.status === 'Cancelled' && <FaTimesCircle />}
                                            {order.status === 'Price Proposed' && <FaExclamationTriangle />}
                                            {order.status === 'Price Rejected' && <FaTimesCircle />}
                                            {order.status}
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar (Visual Flair) */}
                                <div className="h-1 w-full bg-gray-100">
                                    <div
                                        className={`h-full ${order.status === 'Completed' ? 'bg-green-500 w-full' :
                                            order.status === 'Scheduled' ? 'bg-blue-500 w-3/4' :
                                                order.status === 'Pending' ? 'bg-yellow-500 w-1/4' :
                                                    'bg-red-500 w-full'
                                            }`}
                                    ></div>
                                </div>

                                {/* Price Proposal Alert */}
                                {order.status === 'Price Proposed' && (
                                    <div className="bg-orange-50 border-t border-orange-100 p-4 animate-in fade-in slide-in-from-top-2">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-orange-100 p-2 rounded-full">
                                                <FaExclamationTriangle className="text-orange-600 text-lg" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-orange-900">New Price Proposal</h4>
                                                <p className="text-sm text-orange-800 mb-3">
                                                    The rider has updated the weight/price after inspection. Please review the new offer.
                                                </p>

                                                <div className="flex flex-wrap gap-6 mb-4 bg-white/50 p-3 rounded-lg border border-orange-100">
                                                    <div>
                                                        <span className="text-gray-500 text-xs uppercase font-bold">Original Price</span>
                                                        <p className="font-medium line-through text-gray-400">{order.originalPrice || order.amount} PKR</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500 text-xs uppercase font-bold">New Offer</span>
                                                        <p className="font-bold text-green-600 text-xl">{order.finalPrice} PKR</p>
                                                    </div>
                                                    {order.finalWeight && (
                                                        <div>
                                                            <span className="text-gray-500 text-xs uppercase font-bold">New Weight</span>
                                                            <p className="font-bold text-gray-700">{order.finalWeight} kg</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleAcceptProposal(order.id)}
                                                        className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-green-700 shadow-md shadow-green-600/20 transition-all"
                                                    >
                                                        Accept Offer
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectProposal(order.id)}
                                                        className="bg-white text-red-600 border border-red-200 px-5 py-2 rounded-lg text-sm font-bold hover:bg-red-50 transition-all"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <FaBoxOpen className="text-6xl text-gray-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-400">No orders found</h3>
                            <p className="text-gray-400 mb-6">You haven't placed any scrap orders yet.</p>
                            <button
                                onClick={() => navigate('/upload-scrap')}
                                className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors"
                            >
                                Sell Scrap Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserOrders;
