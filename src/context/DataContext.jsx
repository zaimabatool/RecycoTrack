import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const API_URL = 'http://localhost:5000/api';

export const DataProvider = ({ children }) => {
    const [rates, setRates] = useState([]);
    const [orders, setOrders] = useState([]);
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

    useEffect(() => {
        fetchRates();
    }, [fetchRates]);

    // Fetch Orders (Conditional based on role)
    const fetchOrders = useCallback(async () => {
        if (!currentUser) return;
        try {
            const endpoint = currentUser.role === 'admin' ? '/admin/orders' : '/orders/my';
            const data = await apiCall(endpoint);
            setOrders(data.orders);
        } catch (err) {
            console.error('Failed to fetch orders');
        }
    }, [currentUser, apiCall]);

    useEffect(() => {
        if (currentUser) {
            fetchOrders();
        }
    }, [currentUser, fetchOrders]);

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
            // Check if it's a schedule action
            if (status === 'Scheduled' && updates.pickupTime) {
                // The pickupTime is already formatted by the frontend logic in Orders.jsx
                // However, the backend /admin/orders/:id/schedule expects separate date/time fields.
                // Let's check how the frontend currently sends it.
            }

            // For simplicity, we'll try to find a specialized endpoint or use the generic status update
            await apiCall(`/admin/orders/${id}/status`, 'PUT', { status, ...updates });
            fetchOrders();
        } catch (err) {
            alert(err.message);
        }
    };

    // Admin Specialized Actions
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

    return (
        <DataContext.Provider value={{
            rates, addRate, updateRate, deleteRate, fetchRates,
            orders, addOrder, updateOrderStatus, fetchOrders,
            scheduleOrder, finalizeOrder, acceptOrderProposal, rejectOrderProposal,
            currentUser, login, logout, register, updateProfile, loading, apiCall
        }}>
            {children}
        </DataContext.Provider>
    );
};
