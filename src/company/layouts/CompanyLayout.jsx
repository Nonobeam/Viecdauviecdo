import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const CompanyLayout = () => {
    return (
        <div className="min-h-screen bg-[#EEE7FE]">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="flex-grow p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default CompanyLayout;