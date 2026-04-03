import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * MainLayout provides a standardized "sticky footer" structure for all public pages.
 * It uses flexbox to ensure the footer stays at the bottom of the viewport
 * even when the page content is short.
 */
const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-bg-light font-sans">
            {/* Standard navigation bar */}
            <Navbar />

            {/* Main content area that grows to fill available space */}
            <main className="grow pt-[70px]">
                <Outlet />
            </main>

            {/* Application footer remains pinned at the bottom */}
            <Footer />
        </div>
    );
};

export default MainLayout;
