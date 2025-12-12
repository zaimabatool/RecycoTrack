import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useData } from '../context/DataContext';
import { FaCloudUploadAlt, FaCamera, FaMagic, FaCheckCircle, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

const UploadScrap = () => {
    const navigate = useNavigate();
    const { addOrder, rates, currentUser } = useData();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const [mode, setMode] = useState('ai'); // 'ai' or 'manual'
    const [step, setStep] = useState(1); // 1: Input, 2: Payment
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [detectedItems, setDetectedItems] = useState([]);

    // Manual Form State
    const [manualData, setManualData] = useState({
        materialId: '',
        weight: '',
    });

    // Payment State
    const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'online'
    const [paymentDetails, setPaymentDetails] = useState({
        accountNumber: '',
        accountName: ''
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setDetectedItems([]); // Reset previous detection
        }
    };

    const handleAnalyze = () => {
        if (!image) return;
        setLoading(true);
        // Simulate AI Analysis
        setTimeout(() => {
            setLoading(false);
            // Mock detected items based on random selection from available rates
            const randomRate = rates[Math.floor(Math.random() * rates.length)];
            setDetectedItems([{
                ...randomRate,
                detectedWeight: (Math.random() * 10 + 1).toFixed(1), // Random weight 1-10kg
                confidence: 98
            }]);
        }, 2000);
    };

    const calculateTotal = () => {
        if (mode === 'ai') {
            return detectedItems.reduce((acc, item) => acc + (item.price * item.detectedWeight), 0).toFixed(0);
        } else {
            const rate = rates.find(r => r.id === parseInt(manualData.materialId));
            return rate ? (rate.price * parseFloat(manualData.weight || 0)).toFixed(0) : 0;
        }
    };

    const handleSubmitOrder = (e) => {
        e.preventDefault();

        const orderData = {
            userId: currentUser?.id,
            customerName: currentUser?.name || "Guest User",
            date: new Date().toISOString(),
            status: 'Pending',
            paymentMethod,
            paymentDetails: paymentMethod === 'online' ? paymentDetails : null,
            amount: calculateTotal(),
            items: mode === 'ai' ? detectedItems : [{
                ...rates.find(r => r.id === parseInt(manualData.materialId)),
                weight: manualData.weight
            }],
            // For simple display in admin table
            materialName: mode === 'ai' ? detectedItems[0]?.material : rates.find(r => r.id === parseInt(manualData.materialId))?.material,
            weight: mode === 'ai' ? detectedItems[0]?.detectedWeight : manualData.weight
        };

        addOrder(orderData);
        alert("Order submitted successfully! We will contact you shortly.");
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-bg-light font-sans">
            <Navbar />

            <div className="pt-[100px] pb-20 px-4 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-8">
                    Sell Your Scrap
                </h1>

                {/* Mode Toggle */}
                {step === 1 && (
                    <div className="flex justify-center mb-8">
                        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex">
                            <button
                                onClick={() => setMode('ai')}
                                className={`px-6 py-2 rounded-lg font-medium transition-all ${mode === 'ai' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-primary'
                                    }`}
                            >
                                <FaMagic className="inline mr-2" /> AI Auto-Detect
                            </button>
                            <button
                                onClick={() => setMode('manual')}
                                className={`px-6 py-2 rounded-lg font-medium transition-all ${mode === 'manual' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-primary'
                                    }`}
                            >
                                <FaCloudUploadAlt className="inline mr-2" /> Manual Entry
                            </button>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* Step 1: Scrap Details */}
                    {step === 1 && (
                        <div className="p-8">
                            {mode === 'ai' ? (
                                <div className="space-y-6">
                                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary transition-colors bg-gray-50">
                                        {image ? (
                                            <div className="relative">
                                                <img src={image} alt="Uploaded Scrap" className="max-h-64 mx-auto rounded-lg shadow-md" />
                                                <button
                                                    onClick={() => { setImage(null); setDetectedItems([]); }}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="cursor-pointer block">
                                                <FaCamera className="text-5xl text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500 font-medium">Click to upload or drag and drop image</p>
                                                <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG</p>
                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                            </label>
                                        )}
                                    </div>

                                    {image && !detectedItems.length && (
                                        <button
                                            onClick={handleAnalyze}
                                            disabled={loading}
                                            className="w-full py-4 bg-secondary text-white rounded-xl font-bold hover:bg-secondary/90 transition-all flex justify-center items-center gap-2"
                                        >
                                            {loading ? 'Analyzing...' : <><FaMagic /> Analyze Scrap</>}
                                        </button>
                                    )}

                                    {detectedItems.length > 0 && (
                                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <h3 className="font-bold text-lg text-secondary mb-3">Detected Items</h3>
                                            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
                                                {detectedItems.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-bold text-gray-800">{item.material}</p>
                                                            <p className="text-sm text-gray-500">{item.detectedWeight} {item.unit} @ {item.price} PKR</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-primary text-xl">
                                                                {(item.price * item.detectedWeight).toFixed(0)} PKR
                                                            </p>
                                                            <p className="text-xs text-green-600 font-bold flex items-center justify-end gap-1">
                                                                <FaCheckCircle /> {item.confidence}% Confidence
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => setStep(2)}
                                                className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/30"
                                            >
                                                Proceed to Payment
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Manual Mode
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Material</label>
                                        <select
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50"
                                            value={manualData.materialId}
                                            onChange={(e) => setManualData({ ...manualData, materialId: e.target.value })}
                                        >
                                            <option value="">-- Choose Material --</option>
                                            {rates.map(r => (
                                                <option key={r.id} value={r.id}>{r.material} ({r.price} PKR/{r.unit})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Weight (kg/qty)</label>
                                        <input
                                            type="number"
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50"
                                            placeholder="e.g. 5"
                                            value={manualData.weight}
                                            onChange={(e) => setManualData({ ...manualData, weight: e.target.value })}
                                        />
                                    </div>

                                    {manualData.materialId && manualData.weight && (
                                        <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">Estimated Total:</span>
                                            <span className="text-2xl font-bold text-primary">{calculateTotal()} PKR</span>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={!manualData.materialId || !manualData.weight}
                                        className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Payment & Confirmation */}
                    {step === 2 && (
                        <div className="p-8">
                            <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-primary mb-6">← Back to Details</button>

                            <h2 className="text-2xl font-bold text-secondary mb-6">Payment Details</h2>

                            <div className="bg-blue-50 p-4 rounded-xl mb-8 flex justify-between items-center">
                                <span className="text-blue-800 font-medium">Total Payable Amount</span>
                                <span className="text-2xl font-bold text-blue-900">{calculateTotal()} PKR</span>
                            </div>

                            <form onSubmit={handleSubmitOrder} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}>
                                        <input type="radio" name="payment" value="cash" className="hidden" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                                        <FaMoneyBillWave className={`text-3xl ${paymentMethod === 'cash' ? 'text-primary' : 'text-gray-400'}`} />
                                        <span className={`font-bold ${paymentMethod === 'cash' ? 'text-primary' : 'text-gray-500'}`}>Cash on Pickup</span>
                                    </label>

                                    <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}>
                                        <input type="radio" name="payment" value="online" className="hidden" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
                                        <FaCreditCard className={`text-3xl ${paymentMethod === 'online' ? 'text-primary' : 'text-gray-400'}`} />
                                        <span className={`font-bold ${paymentMethod === 'online' ? 'text-primary' : 'text-gray-500'}`}>Online Transfer</span>
                                    </label>
                                </div>

                                {paymentMethod === 'online' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Bank / JazzCash / EasyPaisa Account Number</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50"
                                                placeholder="0300 1234567"
                                                value={paymentDetails.accountNumber}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50"
                                                placeholder="John Doe"
                                                value={paymentDetails.accountName}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, accountName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'cash' && (
                                    <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                                        <p>Our rider will verify the scrap weight and quality at the time of pickup and hand over the cash instantly.</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/30 text-lg"
                                >
                                    Confirm & Sell Scrap
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UploadScrap;
