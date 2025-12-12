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

import { useData } from '../context/DataContext';

const RateList = () => {
  const { rates } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [calcMaterialId, setCalcMaterialId] = useState('');
  const [calcWeight, setCalcWeight] = useState('');

  // Icon Mapping Helper
  const getIcon = (iconType, className) => {
    const icons = {
      GiSodaCan: <GiSodaCan className={className} />,
      GiNewspaper: <GiNewspaper className={className} />,
      GiCardboardBox: <GiCardboardBox className={className} />,
      GiMetalBar: <GiMetalBar className={className} />,
      GiSteelClaws: <GiSteelClaws className={className} />,
      BiCylinder: <BiCylinder className={className} />,
      GiCircuitry: <GiCircuitry className={className} />,
      GiBatteryPack: <GiBatteryPack className={className} />,
      BsCpu: <BsCpu className={className} />
    };
    return icons[iconType] || <GiMetalBar className={className} />;
  };

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
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Current Scrap Rates</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Stay updated with the latest market prices. Filter by category or calculate your potential earnings instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Search, Filter & List */}
          <div className="lg:col-span-2 space-y-6">

            {/* Search and Filter Controls */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-1/2 group">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search materials..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm hover:shadow-md bg-gray-50 focus:bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                      ? 'bg-primary text-white shadow-lg shadow-primary/30 transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-primary border border-gray-200 hover:border-primary/30'
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
                    <tr className="bg-secondary text-white">
                      <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider rounded-tl-xl">Material</th>
                      <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider">Category</th>
                      <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider">Price</th>
                      <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider rounded-tr-xl">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRates.length > 0 ? (
                      filteredRates.map((item) => (
                        <tr key={item.id} className="hover:bg-blue-50/50 transition-colors duration-200 group border-b border-gray-100 last:border-none">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                                {getIcon(item.iconType, item.iconColor)}
                              </div>
                              <span className="font-medium text-secondary">{item.material}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-bold text-primary text-lg">{item.price}</span>
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
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-[100px] backdrop-blur-sm bg-white/90">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-primary rounded-lg text-white">
                  <FaCalculator />
                </div>
                <h2 className="text-xl font-bold text-secondary">Earnings Calculator</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Material</label>
                  <select
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 focus:bg-white transition-all"
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
                      className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 focus:bg-white transition-all"
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Estimated Value:</span>
                    <span className="text-2xl font-bold text-primary">
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
            <div className="bg-secondary p-6 rounded-xl shadow-lg text-white">
              <h3 className="font-bold text-lg mb-3">Why Sell to Us?</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span> Best market rates guaranteed
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span> Instant cash or digital payment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span> Free pickup for bulk quantities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span> Eco-friendly recycling process
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
