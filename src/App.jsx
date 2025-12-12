import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import ComingSoon from './pages/ComingSoon';
import RateList from './pages/RateList';

import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import UploadScrap from './pages/UploadScrap';
import UserOrders from './pages/UserOrders';
import Loader from './components/Loader';
import { DataProvider } from './context/DataContext';

// Admin Components
import AdminLayout from './admin-dashboard/AdminLayout';
import AdminDashboard from './admin-dashboard/AdminDashboard';
import ManageRates from './admin-dashboard/ManageRates';
import Orders from './admin-dashboard/Orders';
import History from './admin-dashboard/History';
import Revenue from './admin-dashboard/Revenue';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/rate-list" element={<RateList />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/upload-scrap" element={<UploadScrap />} />
          <Route path="/user-orders" element={<UserOrders />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="rates" element={<ManageRates />} />
            <Route path="orders" element={<Orders />} />
            <Route path="revenue" element={<Revenue />} />
            <Route path="history" element={<History />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
