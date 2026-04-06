import React from 'react';
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
import Profile from './pages/Profile';
import Loader from './components/Loader';
import { useData } from './context/DataContext';

import MainLayout from './components/MainLayout';

// Admin Components
import AdminLayout from './admin-dashboard/AdminLayout';
import AdminDashboard from './admin-dashboard/AdminDashboard';
import ManageRates from './admin-dashboard/ManageRates';
import Orders from './admin-dashboard/Orders';
import ManageRiders from './admin-dashboard/ManageRiders';
import ManageUsers from './admin-dashboard/ManageUsers';
import History from './admin-dashboard/History';
import Revenue from './admin-dashboard/Revenue';

// Rider Components
import RiderLayout from './rider-dashboard/RiderLayout';
import RiderOrders from './rider-dashboard/RiderOrders';

function App() {
  const { loading } = useData();

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Global Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rate-list" element={<RateList />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/upload-scrap" element={<UploadScrap />} />
          <Route path="/user-orders" element={<UserOrders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Standalone Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes with Private Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="rates" element={<ManageRates />} />
          <Route path="orders" element={<Orders />} />
          <Route path="riders" element={<ManageRiders />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Rider Routes with Private Layout */}
        <Route path="/rider" element={<RiderLayout />}>
          <Route index element={<RiderOrders />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
