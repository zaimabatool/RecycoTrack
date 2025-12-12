import React, { createContext, useState, useEffect, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // Initial Rates Data
    const initialRates = [
        { id: 1, material: 'Plastic Bottles (PET)', category: 'Plastic', unit: 'kg', price: 45, trend: 'up', iconType: 'GiSodaCan', iconColor: 'text-blue-500' },
        { id: 2, material: 'Newspaper', category: 'Paper', unit: 'kg', price: 25, trend: 'stable', iconType: 'GiNewspaper', iconColor: 'text-gray-500' },
        { id: 3, material: 'Cardboard', category: 'Paper', unit: 'kg', price: 18, trend: 'down', iconType: 'GiCardboardBox', iconColor: 'text-yellow-600' },
        { id: 4, material: 'Iron', category: 'Metal', unit: 'kg', price: 60, trend: 'up', iconType: 'GiMetalBar', iconColor: 'text-gray-700' },
        { id: 5, material: 'Steel', category: 'Metal', unit: 'kg', price: 55, trend: 'stable', iconType: 'GiSteelClaws', iconColor: 'text-gray-400' },
        { id: 6, material: 'Aluminium', category: 'Metal', unit: 'kg', price: 180, trend: 'up', iconType: 'BiCylinder', iconColor: 'text-gray-300' },
        { id: 7, material: 'Copper', category: 'Metal', unit: 'kg', price: 750, trend: 'up', iconType: 'BiCylinder', iconColor: 'text-orange-500' },
        { id: 8, material: 'Brass', category: 'Metal', unit: 'kg', price: 480, trend: 'down', iconType: 'BiCylinder', iconColor: 'text-yellow-500' },
        { id: 9, material: 'E-Waste (Mixed)', category: 'E-Waste', unit: 'kg', price: 35, trend: 'stable', iconType: 'GiCircuitry', iconColor: 'text-green-600' },
        { id: 10, material: 'Batteries', category: 'E-Waste', unit: 'kg', price: 90, trend: 'up', iconType: 'GiBatteryPack', iconColor: 'text-red-600' },
        { id: 11, material: 'CPU Processor', category: 'E-Waste', unit: 'pc', price: 250, trend: 'stable', iconType: 'BsCpu', iconColor: 'text-blue-600' },
    ];

    // Load from LocalStorage or use initial
    const [rates, setRates] = useState(() => {
        const savedRates = localStorage.getItem('rates');
        return savedRates ? JSON.parse(savedRates) : initialRates;
    });

    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    const [history, setHistory] = useState(() => {
        const savedHistory = localStorage.getItem('history');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    // Save to LocalStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('rates', JSON.stringify(rates));
    }, [rates]);

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history));
    }, [history]);

    // Actions
    const addRate = (newRate) => {
        setRates([...rates, { ...newRate, id: Date.now() }]);
    };

    const updateRate = (id, updatedRate) => {
        setRates(rates.map(rate => rate.id === id ? { ...rate, ...updatedRate } : rate));
    };

    const deleteRate = (id) => {
        setRates(rates.filter(rate => rate.id !== id));
    };

    const addOrder = (order) => {
        setOrders([...orders, { ...order, id: Date.now(), status: 'Pending', date: new Date().toISOString() }]);
    };

    const updateOrderStatus = (id, status) => {
        setOrders(orders.map(order => order.id === id ? { ...order, status } : order));
    };

    return (
        <DataContext.Provider value={{
            rates, addRate, updateRate, deleteRate,
            orders, addOrder, updateOrderStatus,
            history
        }}>
            {children}
        </DataContext.Provider>
    );
};
