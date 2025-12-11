import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaSearch, FaCalculator, FaFilter } from 'react-icons/fa';
import {
  GiSodaCan, GiNewspaper, GiCardboardBox, GiMetalBar,
  GiSteelClaws, GiBatteryPack, GiCircuitry
} from 'react-icons/gi';
import { BiCylinder } from 'react-icons/bi';
import { BsCpu } from 'react-icons/bs';

const RateList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [calcMaterialId, setCalcMaterialId] = useState('');
  const [calcWeight, setCalcWeight] = useState('');

  const rates = [
    { id: 1, material: 'Plastic Bottles (PET)', category: 'Plastic', unit: 'kg', price: 45, trend: 'up', icon: <GiSodaCan className="text-blue-500" /> },
    { id: 2, material: 'Newspaper', category: 'Paper', unit: 'kg', price: 25, trend: 'stable', icon: <GiNewspaper className="text-gray-500" /> },
    { id: 3, material: 'Cardboard', category: 'Paper', unit: 'kg', price: 18, trend: 'down', icon: <GiCardboardBox className="text-yellow-600" /> },
    { id: 4, material: 'Iron', category: 'Metal', unit: 'kg', price: 60, trend: 'up', icon: <GiMetalBar className="text-gray-700" /> },
    { id: 5, material: 'Steel', category: 'Metal', unit: 'kg', price: 55, trend: 'stable', icon: <GiSteelClaws className="text-gray-400" /> },
    { id: 6, material: 'Aluminium', category: 'Metal', unit: 'kg', price: 180, trend: 'up', icon: <BiCylinder className="text-gray-300" /> },
    { id: 7, material: 'Copper', category: 'Metal', unit: 'kg', price: 750, trend: 'up', icon: <BiCylinder className="text-orange-500" /> },
    { id: 8, material: 'Brass', category: 'Metal', unit: 'kg', price: 480, trend: 'down', icon: <BiCylinder className="text-yellow-500" /> },
    { id: 9, material: 'E-Waste (Mixed)', category: 'E-Waste', unit: 'kg', price: 35, trend: 'stable', icon: <GiCircuitry className="text-green-600" /> },
    { id: 10, material: 'Batteries', category: 'E-Waste', unit: 'kg', price: 90, trend: 'up', icon: <GiBatteryPack className="text-red-600" /> },
    { id: 11, material: 'CPU Processor', category: 'E-Waste', unit: 'pc', price: 250, trend: 'stable', icon: <BsCpu className="text-blue-600" /> },
  ];

  const categories = ['All', 'Metal', 'Plastic', 'Paper', 'E-Waste'];

  const filteredRates = useMemo(() => {
    return rates.filter(item => {
      const matchesSearch = item.material.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const calculateEarnings = () => {
    if (!calcMaterialId || !calcWeight) return 0;
    const material = rates.find(r => r.id === parseInt(calcMaterialId));
    return material ? material.price * parseFloat(calcWeight) : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-[100px] pb-10 px-4 max-w-[1280px] mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#082b5c] mb-4">Current Scrap Rates</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Stay updated with the latest market prices. Filter by category or calculate your potential earnings instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Search, Filter & List */}
          <div className="lg:col-span-2 space-y-6">

            {/* Search and Filter Controls */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-1/2">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search materials..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0e9d90] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat
                        ? 'bg-[#0e9d90] text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Rates Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#082b5c] text-white">
                      <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider">Material</th>
                      <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider">Category</th>
                      <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider">Price</th>
                      <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRates.length > 0 ? (
                      filteredRates.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150 group">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                                {item.icon}
                              </div>
                              <span className="font-medium text-[#082b5c]">{item.material}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-bold text-[#0e9d90] text-lg">{item.price}</span>
                            <span className="text-xs text-gray-500 ml-1">PKR / {item.unit}</span>
                          </td>
                          <td className="py-4 px-6">
                            {item.trend === 'up' && <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold w-fit">▲ Up</span>}
                            {item.trend === 'down' && <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-bold w-fit">▼ Down</span>}
                            {item.trend === 'stable' && <span className="flex items-center gap-1 text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs font-bold w-fit">• Stable</span>}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-8 text-center text-gray-500">
                          No materials found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Calculator & Info */}
          <div className="space-y-6">

            {/* Calculator Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-[100px]">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-[#0e9d90] rounded-lg text-white">
                  <FaCalculator />
                </div>
                <h2 className="text-xl font-bold text-[#082b5c]">Earnings Calculator</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Material</label>
                  <select
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0e9d90] focus:border-transparent outline-none"
                    value={calcMaterialId}
                    onChange={(e) => setCalcMaterialId(e.target.value)}
                  >
                    <option value="">-- Choose Material --</option>
                    {rates.map(r => (
                      <option key={r.id} value={r.id}>{r.material} ({r.price} PKR/{r.unit})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight / Quantity</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      placeholder="Enter value"
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0e9d90] focus:border-transparent outline-none"
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Estimated Value:</span>
                    <span className="text-2xl font-bold text-[#0e9d90]">
                      {calculateEarnings().toLocaleString()} <span className="text-sm font-normal text-gray-500">PKR</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 text-center">
                    *Estimation based on current standard rates.
                  </p>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-[#082b5c] p-6 rounded-xl shadow-lg text-white">
              <h3 className="font-bold text-lg mb-3">Why Sell to Us?</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#0e9d90] mt-1">✓</span> Best market rates guaranteed
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0e9d90] mt-1">✓</span> Instant cash or digital payment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0e9d90] mt-1">✓</span> Free pickup for bulk quantities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0e9d90] mt-1">✓</span> Eco-friendly recycling process
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RateList;
