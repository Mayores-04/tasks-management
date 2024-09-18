"use client";
import React, { useState } from 'react';
import TaskTable from './TaskTable';
import Sidebar from '../Components/Sidebar';
import TaskTableSmall from './TaskTableSmall';

const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar for medium and larger screens */}
            <aside className="w-64 bg-gray-800 text-white hidden md:block fixed h-screen transition-transform duration-300 ease-in-out">
                <Sidebar />
            </aside>
            
            {/* Mobile version */}
            <div className={`fixed inset-0 md:hidden bg-white overflow-y-auto transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button
                    className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded"
                    onClick={toggleSidebar}
                >
                    {sidebarOpen ? 'Close' : 'Open'} Menu
                </button>
                <div className="mt-16">
                    <Sidebar />
                    <TaskTableSmall userId="your-user-id"/>
                </div>
            </div>
            
            {/* Main content area */}
            <main className="flex-1 p-4 overflow-y-auto ml-0 md:ml-64">
                <TaskTable userId="your-user-id" />
            </main>
        </div>
    );
};

export default App;
