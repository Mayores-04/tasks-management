"use client";

import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Reporting from '../Components/Reporting';
import CalendarComponent from '../Components/CalendarComponent';

const Dashboard: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState<string[]>(['Notification 1', 'Notification 2']); // Example notifications

    // Sample data for demonstration
    const data: { [key: string]: string[] } = {
        dashboard: ['Dashboard Overview', 'Dashboard Stats'],
        tasks: ['Task 1', 'Task 2', 'Task 3', 'Add Tasks']
    };
    
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = () => {
        const results = Object.keys(data).flatMap(key =>
            data[key].filter((item: string) =>
                item.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (searchTerm.toLowerCase().includes('task') || key === 'dashboard')
            )

        );
        setSearchResults(results);
    };

    const handleNotifications = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
    };

    return (
        <div className="flex">
            <Sidebar />

            <main className="flex-1 overflow-y-auto h-screen p-4 bg-gray-100">
                <header className="bg-white shadow-md p-4 rounded-md relative mb-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-start">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4 lg:mb-0 lg:text-left w-full text-center lg:w-auto">
                            Dashboard
                        </h1>
                        <div className="flex space-x-4 lg:ml-auto relative">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') handleSearch();
                                    }}
                                    placeholder="Search..."
                                    className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6zM20 20l-4.35-4.35" />
                                    </svg>
                                </button>
                                {searchTerm && (
                                    <div className="absolute top-full left-0 mt-2 w-full max-w-md bg-white shadow-lg rounded-lg p-4 z-50">
                                        <h2 className="text-xl font-semibold mb-2">Search Results:</h2>
                                        <ul className="space-y-2">
                                            {searchResults.length > 0 ? (
                                                searchResults.map((result, index) => (
                                                    <li key={index} className="p-2 border-b last:border-b-0">
                                                        {result}
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No results found</li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Notifications Button */}
                            <div className="relative">
                                <button
                                    onClick={handleNotifications}
                                    className="text-gray-600 hover:text-gray-900 focus:outline-none"
                                >
                                    <span className="sr-only">Notifications</span>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V10a6 6 0 0 0-12 0v6H4v2h16v-2h-2z" />
                                    </svg>
                                </button>
                                {isNotificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                                        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                                        <ul className="space-y-2">
                                            {notifications.length > 0 ? (
                                                notifications.map((notification, index) => (
                                                    <li key={index} className="flex justify-between items-center p-2 border-b last:border-b-0">
                                                        <span>{notification}</span>
                                                        <button
                                                            onClick={() => {
                                                                setNotifications(prev => prev.filter((_, i) => i !== index));
                                                            }}
                                                            className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No notifications</li>
                                            )}
                                        </ul>
                                        <button
                                            onClick={handleNotifications}
                                            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 mt-4 lg:mt-8 lg:mr-2">
                            <Reporting />
                        </div>
                        <div className="flex-1 mt-4 lg:mt-8">
                            <CalendarComponent />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
