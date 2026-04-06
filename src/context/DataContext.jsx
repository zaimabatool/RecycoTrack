import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const API_URL = 'http://localhost:5000/api';

export const DataProvider = ({ children }) => {
    const [rates, setRates] = useState([]);
    const [orders, setOrders] = useState([]);
    const [riders, setRiders] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('recycotrack_token'));
    const [loading, setLoading] = useState(true);

    // Helper for API calls
    const apiCall = useCallback(async (endpoint, method = 'GET', body = null) => {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options = {
            method,
            headers,
        };
        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, options);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error.message);
            throw error;
        }
    }, [token]);

    // Initialize: Fetch current user if token exists
    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    const data = await apiCall('/auth/me');
                    setCurrentUser(data.user);
                } catch (err) {
                    console.error('Session expired or invalid token');
                    localStorage.removeItem('recycotrack_token');
                    setToken(null);
                    setCurrentUser(null);
                }
            }
            setLoading(false);
        };
        initAuth();
    }, [token, apiCall]);

    // Fetch Rates
    const fetchRates = useCallback(async () => {
        try {
            const data = await apiCall('/rates');
            setRates(data.rates);
        } catch (err) {
            console.error('Failed to fetch rates');
        }
    }, [apiCall]);

    // Fetch Orders (Conditional based on role)
    const fetchOrders = useCallback(async () => {
        if (!currentUser) return;
        try {
            const endpoint = (currentUser.role === 'admin' || currentUser.role === 'rider')
                ? '/admin/orders'
                : '/orders/my';
            const data = await apiCall(endpoint);
            setOrders(data.orders);
        } catch (err) {
            console.error('Failed to fetch orders');
        }
    }, [currentUser, apiCall]);

    // Rider Management (Admin)
    const fetchRiders = useCallback(async () => {
        if (!currentUser || currentUser.role !== 'admin') return;
        try {
            const data = await apiCall('/admin/riders');
            setRiders(data.riders);
        } catch (err) {
            console.error('Failed to fetch riders');
        }
    }, [currentUser, apiCall]);

    // User Management (Admin)
    const fetchUsers = useCallback(async () => {
        if (!currentUser || currentUser.role !== 'admin') return;
        try {
            const data = await apiCall('/admin/users');
            setUsers(data.users);
        } catch (err) {
            console.error('Failed to fetch users');
        }
    }, [currentUser, apiCall]);

    useEffect(() => {
        fetchRates();
    }, [fetchRates]);

    useEffect(() => {
        if (currentUser) {
            fetchOrders();
            if (currentUser.role === 'admin') {
                fetchRiders();
                fetchUsers();
            }
        }
    }, [currentUser, fetchOrders, fetchRiders, fetchUsers]);

    // Auth Actions
    const login = async (email, password) => {
        try {
            const data = await apiCall('/auth/login', 'POST', { email, password });
            localStorage.setItem('recycotrack_token', data.token);
            setToken(data.token);
            setCurrentUser(data.user);
            return { success: true, user: data.user };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('recycotrack_token');
        setToken(null);
        setCurrentUser(null);
        setOrders([]);
        setRiders([]);
        setUsers([]);
    };

    const updateProfile = async (userData) => {
        try {
            const data = await apiCall('/auth/profile', 'PUT', userData);
            setCurrentUser(data.user);
            return { success: true, user: data.user };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const register = async (newUser) => {
        try {
            const data = await apiCall('/auth/register', 'POST', newUser);
            localStorage.setItem('recycotrack_token', data.token);
            setToken(data.token);
            setCurrentUser(data.user);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    // Rate Actions (Admin)
    const addRate = async (newRate) => {
        try {
            await apiCall('/rates', 'POST', newRate);
            fetchRates();
        } catch (err) {
            alert(err.message);
        }
    };

    const updateRate = async (id, updatedRate) => {
        try {
            await apiCall(`/rates/${id}`, 'PUT', updatedRate);
            fetchRates();
        } catch (err) {
            alert(err.message);
        }
    };

    const deleteRate = async (id) => {
        try {
            await apiCall(`/rates/${id}`, 'DELETE');
            fetchRates();
        } catch (err) {
            alert(err.message);
        }
    };

    // Rider Management Actions
    const addRider = async (riderData) => {
        try {
            const data = await apiCall('/admin/riders', 'POST', riderData);
            if (data.success) {
                setRiders(prev => [data.rider, ...prev]);
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (err) {
            throw err;
        }
    };

    const updateRider = async (id, riderData) => {
        try {
            const data = await apiCall(`/admin/riders/${id}`, 'PUT', riderData);
            if (data.success) {
                setRiders(prev => prev.map(r => r.id === id ? data.rider : r));
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (err) {
            throw err;
        }
    };

    const deleteRider = async (riderId) => {
        try {
            const data = await apiCall(`/admin/riders/${riderId}`, 'DELETE');
            if (data.success) {
                setRiders(prev => prev.filter(r => r.id !== riderId));
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (err) {
            throw err;
        }
    };

    // User Management Actions
    const addUser = async (userData) => {
        try {
            const data = await apiCall('/admin/users', 'POST', userData);
            if (data.success) {
                setUsers(prev => [data.user, ...prev]);
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (err) {
            throw err;
        }
    };

    const updateUser = async (id, userData) => {
        try {
            const data = await apiCall(`/admin/users/${id}`, 'PUT', userData);
            if (data.success) {
                setUsers(prev => prev.map(u => u.id === id ? data.user : u));
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (err) {
            throw err;
        }
    };

    const deleteUser = async (userId) => {
        try {
            const data = await apiCall(`/admin/users/${userId}`, 'DELETE');
            if (data.success) {
                setUsers(prev => prev.filter(u => u.id !== userId));
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (err) {
            throw err;
        }
    };

    // Order Actions
    const addOrder = async (order) => {
        try {
            await apiCall('/orders', 'POST', order);
            fetchOrders();
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const updateOrderStatus = async (id, status, updates = {}) => {
        try {
            await apiCall(`/admin/orders/${id}/status`, 'PUT', { status, ...updates });
            fetchOrders();
        } catch (err) {
            alert(err.message);
        }
    };

    const scheduleOrder = async (id, scheduleData) => {
        try {
            await apiCall(`/admin/orders/${id}/schedule`, 'PUT', scheduleData);
            fetchOrders();
        } catch (err) {
            alert(err.message);
        }
    };

    const finalizeOrder = async (id, finalizeData) => {
        try {
            await apiCall(`/admin/orders/${id}/finalize`, 'PUT', finalizeData);
            fetchOrders();
        } catch (err) {
            alert(err.message);
        }
    };

    const acceptOrderProposal = async (id) => {
        try {
            await apiCall(`/orders/${id}/accept-proposal`, 'PUT');
            fetchOrders();
        } catch (err) {
            alert(err.message);
        }
    };

    const rejectOrderProposal = async (id) => {
        try {
            await apiCall(`/orders/${id}/reject-proposal`, 'PUT');
            fetchOrders();
        } catch (err) {
            alert(err.message);
        }
    };

    const cancelUserOrder = async (id) => {
        try {
            await apiCall(`/orders/${id}/cancel`, 'PUT');
            fetchOrders();
            return { success: true };
        } catch (err) {
            alert(err.message);
            return { success: false, message: err.message };
        }
    };

    return (
        <DataContext.Provider value={{
            rates, addRate, updateRate, deleteRate, fetchRates,
            orders, addOrder, updateOrderStatus, fetchOrders,
            scheduleOrder, finalizeOrder, acceptOrderProposal, rejectOrderProposal, cancelUserOrder,
            riders, addRider, updateRider, deleteRider, fetchRiders,
            users, addUser, updateUser, deleteUser, fetchUsers,
            currentUser, login, logout, register, updateProfile, loading, apiCall
        }}>
            {children}
        </DataContext.Provider>
    );
};
