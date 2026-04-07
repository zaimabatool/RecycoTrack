import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { FaCloudUploadAlt, FaCamera, FaMagic, FaCheckCircle, FaMoneyBillWave, FaCreditCard, FaTimesCircle, FaExclamationTriangle, FaClock, FaArrowRight } from 'react-icons/fa';

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
    const [selectedFile, setSelectedFile] = useState(null); // Store the actual File object
    const [aiMaterialId, setAiMaterialId] = useState(''); // New state for AI mode material
    const [detectedItems, setDetectedItems] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone || '');
    const [showLimitModal, setShowLimitModal] = useState(false);

    const GRADE_RANKS = {
        'Premium': 4,
        'A Grade': 3,
        'B Grade': 2,
        'Standard': 1,
        'Poor': 0,
        'N/A': -1
    };

    // Manual Form State
    const [manualData, setManualData] = useState({
        materialId: '',
        weight: '',
    });

    // Payment State
    const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'online'
    const [address, setAddress] = useState(currentUser?.address || '');
    const [paymentDetails, setPaymentDetails] = useState({
        accountNumber: '',
        accountName: ''
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImage(URL.createObjectURL(file));
            setDetectedItems([]); // Reset previous detection
        }
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;
        setLoading(true);

        // Get all available material names from our rates list
        const availableMaterials = rates.map(r => r.material);

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('availableMaterials', JSON.stringify(availableMaterials));

        try {
            const response = await fetch('http://localhost:5000/api/ai/analyze', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                const analysisResults = Array.isArray(data.analysis) ? data.analysis : [data.analysis];

                let matchedItems = analysisResults.map((analysis, index) => {
                    const matchedRate = rates.find(r => r.material === analysis.material);

                    if (matchedRate && analysis.isMatch === true) {
                        const isAccepted = GRADE_RANKS[analysis.quality || 'Poor'] >= GRADE_RANKS[matchedRate.minGrade || 'Poor'];

                        return {
                            ...matchedRate,
                            quality: analysis.quality,
                            reason: analysis.reason,
                            detectedWeight: '', // User will input this
                            confidence: analysis.confidence,
                            isMatch: true,
                            isAccepted: isAccepted,
                            minRequiredGrade: matchedRate.minGrade || 'Poor'
                        };
                    } else {
                        return {
                            material: analysis.material || 'Non-Recyclable Item',
                            quality: analysis.quality || 'N/A',
                            reason: analysis.reason || 'Not identified as a standard recyclable material.',
                            detectedWeight: 0,
                            price: 0,
                            unit: 'kg',
                            confidence: analysis.confidence || 0,
                            isMatch: false,
                            isAccepted: false
                        };
                    }
                });

                setDetectedItems(matchedItems);
            } else {
                if (data.errorCode === 'ALL_KEYS_EXHAUSTED') {
                    setShowLimitModal(true);
                } else {
                    alert(data.message || 'Analysis failed');
                }
            }
        } catch (error) {
            console.error('Analysis Error:', error);
            alert('Failed to connect to AI service');
        } finally {
            setLoading(false);
        }
    };

    const handleWeightChange = (index, value) => {
        const updatedItems = [...detectedItems];
        updatedItems[index].detectedWeight = value;
        setDetectedItems(updatedItems);
    };

    const calculateTotal = () => {
        if (mode === 'ai') {
            return detectedItems
                .filter(item => item.isAccepted)
                .reduce((acc, item) => acc + (item.price * parseFloat(item.detectedWeight || 0)), 0)
                .toFixed(0);
        } else {
            const rate = rates.find(r => r.id === manualData.materialId);
            return rate ? (rate.price * parseFloat(manualData.weight || 0)).toFixed(0) : 0;
        }
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const selectedRate = rates.find(r => r.id === manualData.materialId);

        const acceptedItems = mode === 'ai' ? detectedItems.filter(item => item.isAccepted) : [{
            ...selectedRate,
            weight: manualData.weight
        }];

        const orderData = {
            userId: currentUser?.id,
            customerName: currentUser?.name || "Guest User",
            customerPhone: phoneNumber,
            address,
            paymentMethod,
            paymentDetails: paymentMethod === 'online' ? paymentDetails : null,
            amount: calculateTotal(),
            items: acceptedItems,
            // For simple display in admin table
            materialName: mode === 'ai' 
                ? (acceptedItems.length > 1 ? `Mixed Scrap (${acceptedItems.length} items)` : acceptedItems[0]?.material)
                : (rates.find(r => r.id === manualData.materialId)?.material || "Unknown"),
            weight: mode === 'ai'
                ? acceptedItems.reduce((sum, item) => sum + parseFloat(item.detectedWeight || 0), 0)
                : manualData.weight
        };

        const result = await addOrder(orderData);
        setLoading(false);

        if (result.success) {
            alert("Order submitted successfully! We will contact you shortly.");
            navigate('/user-orders');
        } else {
            alert(`Error: ${result.message}`);
        }
    };

    return (
        <div className="bg-bg-light">
            <div className="pt-20 pb-20 px-4 max-w-4xl mx-auto">
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
                                    {/* AI Intelligence Info Box */}
                                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 shadow-sm transition-all hover:bg-white hover:border-primary/30">
                                        <div className="flex flex-col md:flex-row items-center gap-4">
                                            <div className="p-3 bg-white rounded-full shadow-sm">
                                                <FaMagic className="text-2xl text-primary animate-pulse" />
                                            </div>
                                            <div className="flex-1 text-center md:text-left">
                                                <p className="font-bold text-secondary mb-1 text-lg">AI Smart Analysis</p>
                                                <p className="text-gray-600 leading-relaxed italic">Upload a photo of your scrap, and our AI will automatically identify the material and its quality grade for you.</p>
                                            </div>
                                        </div>
                                    </div>

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
                                            className="w-full py-4 bg-secondary text-white rounded-xl font-bold hover:bg-secondary/90 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Analyzing Content...' : <><FaMagic /> Identify Material & Quality</>}
                                        </button>
                                    )}                                    {detectedItems.length > 0 && (
                                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <h3 className="font-bold text-lg text-secondary mb-4 flex items-center gap-2">
                                                <div className="p-1.5 bg-primary/10 rounded-lg text-primary"><FaMagic /></div>
                                                Detected Items
                                            </h3>
                                            
                                            <div className="space-y-4 mb-8">
                                                {detectedItems.map((item, idx) => {
                                                    const isMatch = item.isMatch !== false;
                                                    const isAccepted = item.isAccepted !== false;
                                                    
                                                    return (
                                                        <div key={idx} className={`p-6 rounded-2xl border-2 transition-all shadow-sm ${
                                                            isMatch && isAccepted 
                                                                ? 'bg-white border-green-100 hover:border-green-200' 
                                                                : 'bg-gray-50/50 border-red-100 opacity-90'
                                                        }`}>
                                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 flex-wrap mb-2">
                                                                        <h4 className={`text-xl font-black ${isMatch && isAccepted ? 'text-gray-800' : 'text-gray-500 line-through'}`}>
                                                                            {item.material}
                                                                        </h4>
                                                                        {isMatch && isAccepted ? (
                                                                            <span className="bg-green-100 text-green-700 text-[10px] uppercase font-black px-2 py-1 rounded-md tracking-wider flex items-center gap-1">
                                                                                <FaCheckCircle className="text-xs" /> Verified Match
                                                                            </span>
                                                                        ) : (
                                                                            <span className="bg-red-100 text-red-700 text-[10px] uppercase font-black px-2 py-1 rounded-md tracking-wider flex items-center gap-1">
                                                                                <FaTimesCircle className="text-xs" /> Analysis Mismatch
                                                                            </span>
                                                                        )}
                                                                        {isMatch && isAccepted && (
                                                                            <span className="bg-primary/5 text-primary text-[10px] font-bold px-2 py-1 rounded-md">
                                                                                {item.quality}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <p className={`text-sm italic italic leading-relaxed ${isMatch && isAccepted ? 'text-gray-600' : 'text-gray-400'}`}>
                                                                        " {item.reason} "
                                                                    </p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className={`text-sm font-black flex items-center justify-end gap-1 ${isMatch && isAccepted ? 'text-green-600' : 'text-red-400'}`}>
                                                                        {isMatch && isAccepted ? <FaCheckCircle /> : <FaExclamationTriangle />} {item.confidence}% Confidence
                                                                    </p>
                                                                    {isMatch && isAccepted && (
                                                                        <p className="text-xs text-gray-400 mt-1">Rate: {item.price} PKR/{item.unit}</p>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {isMatch && isAccepted ? (
                                                                <div className="mt-6 pt-6 border-t border-gray-100">
                                                                    <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4">
                                                                        <div className="w-full md:w-auto flex-1">
                                                                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 block mb-2 px-1">
                                                                                Quantity / Estimated Weight ({item.unit})
                                                                            </label>
                                                                            <div className="relative group max-w-xs">
                                                                                <input 
                                                                                    type="number"
                                                                                    placeholder="0.0"
                                                                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-lg font-black focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-inner group-hover:border-primary/30"
                                                                                    value={item.detectedWeight}
                                                                                    onChange={(e) => handleWeightChange(idx, e.target.value)}
                                                                                />
                                                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-300 pointer-events-none">{item.unit.toUpperCase()}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-right bg-primary/5 p-4 rounded-2xl border border-primary/10 min-w-[160px] animate-in zoom-in slide-in-from-right-4 duration-300">
                                                                            <label className="text-[10px] uppercase tracking-widest font-black text-primary block mb-1">Estimated Value</label>
                                                                            <p className="text-secondary font-black text-2xl flex items-center justify-end gap-2">
                                                                                {(parseFloat(item.detectedWeight || 0) * item.price).toFixed(0)} <span className="text-sm font-bold opacity-50">PKR</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-red-500 bg-red-100/50 p-3 rounded-xl border border-red-100">
                                                                    <FaExclamationTriangle className="animate-pulse" />
                                                                    This item did not match the criteria and will be excluded from the order.
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <div className="space-y-4">
                                                <button
                                                    onClick={() => setStep(2)}
                                                    disabled={
                                                        !detectedItems.some(item => item.isAccepted) || 
                                                        detectedItems.filter(item => item.isAccepted).some(item => !item.detectedWeight || parseFloat(item.detectedWeight) <= 0)
                                                    }
                                                    className="w-full py-5 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition-all shadow-xl shadow-green-600/20 text-lg disabled:bg-gray-200 disabled:shadow-none disabled:cursor-not-allowed group"
                                                >
                                                    {!detectedItems.some(item => item.isAccepted)
                                                        ? 'No Valid Items Detected'
                                                        : detectedItems.filter(item => item.isAccepted).some(item => !item.detectedWeight || parseFloat(item.detectedWeight) <= 0)
                                                            ? 'Please Enter Valid Weight'
                                                            : detectedItems.some(item => !item.isAccepted)
                                                                ? <span className="flex items-center justify-center gap-2">Proceed with Accepted Items Only <FaArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
                                                                : <span className="flex items-center justify-center gap-2">Proceed to Payment <FaArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
                                                    }
                                                </button>
                                                
                                                {detectedItems.some(item => !item.isAccepted) && detectedItems.some(item => item.isAccepted) && (
                                                    <div className="flex items-center justify-center gap-2 text-xs text-amber-600 font-bold bg-amber-50 py-3 px-4 rounded-xl border border-amber-100 animate-pulse">
                                                        <FaClock /> Note: Rejected items (grayed out) will be automatically removed from this order.
                                                    </div>
                                                )}
                                            </div>
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

                                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 mt-4">
                                    <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                        Confirm Phone Number for Rider
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="e.g. 0300-1234567"
                                        className="w-full p-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none bg-white font-bold transition-all"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                    <p className="text-[10px] text-gray-400 mt-2 italic">Rider will use this number to coordinate collection.</p>
                                </div>

                                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                    <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                        Pickup Address
                                    </label>
                                    <textarea
                                        required
                                        placeholder="Enter your complete pickup address..."
                                        className="w-full p-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none bg-white font-bold transition-all min-h-[100px]"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    <p className="text-[10px] text-gray-400 mt-2 italic">Please provide full address details (House #, Street, Area).</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !phoneNumber || !address}
                                    className="w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/30 text-lg disabled:bg-gray-300 disabled:shadow-none"
                                >
                                    {loading ? 'Submitting...' : 'Confirm & Sell Scrap'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* AI Limit Reached Modal */}
            {showLimitModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-secondary/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
                        <div className="bg-amber-500 p-8 text-center relative">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-size-[20px_20px]"></div>
                            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                                <FaExclamationTriangle className="text-4xl text-white animate-pulse" />
                            </div>
                            <h2 className="text-2xl font-black text-white relative z-10">AI Capacity Reached</h2>
                        </div>
                        
                        <div className="p-8 text-center">
                            <p className="text-gray-600 font-medium leading-relaxed mb-8">
                                Our smart analysis servers are currently at their peak daily capacity. 🔕 
                                <br/><br/>
                                To ensure fairness for all users, AI identification is temporarily paused. You can still sell your scrap by using our <strong>Manual Entry</strong> mode!
                            </p>
                            
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={() => {
                                        setMode('manual');
                                        setShowLimitModal(false);
                                    }}
                                    className="w-full py-4 bg-primary text-white rounded-xl font-black hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                >
                                    <FaMagic /> Switch to Manual Entry
                                </button>
                                <button 
                                    onClick={() => setShowLimitModal(false)}
                                    className="w-full py-4 bg-gray-50 text-gray-500 rounded-xl font-bold hover:bg-gray-100 transition-all"
                                >
                                    I'll Try Later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadScrap;
