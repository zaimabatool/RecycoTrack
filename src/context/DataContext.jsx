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

    // Dummy Users
    const initialUsers = [
        { id: 1, name: 'Ali Khan', email: 'user@test.com', password: '123', phone: '03001234567' },
        { id: 2, name: 'Admin User', email: 'admin@recycotrack.com', password: 'admin', role: 'admin' }
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

    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : initialUsers;
    });

    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
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

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    // Real-time Sync across tabs
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'rates') {
                setRates(JSON.parse(e.newValue));
            } else if (e.key === 'orders') {
                setOrders(JSON.parse(e.newValue));
            } else if (e.key === 'history') {
                setHistory(JSON.parse(e.newValue));
            } else if (e.key === 'users') {
                setUsers(JSON.parse(e.newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

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

    const updateOrderStatus = (id, status, updates = {}) => {
        setOrders(orders.map(order => order.id === id ? { ...order, status, ...updates } : order));
    };

    // Auth Actions
    const login = (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return { success: true, user };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const register = (newUser) => {
        if (users.find(u => u.email === newUser.email)) {
            return { success: false, message: 'Email already exists' };
        }
        const user = { ...newUser, id: Date.now() };
        setUsers([...users, user]);
        setCurrentUser(user);
        return { success: true };
    };

    return (
        <DataContext.Provider value={{
            rates, addRate, updateRate, deleteRate,
            orders, addOrder, updateOrderStatus,
            history,
            currentUser, login, logout, register, users
        }}>
            {children}
        </DataContext.Provider>
    );
};
