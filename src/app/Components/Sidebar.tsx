import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Toggle Button for Small Screens */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={toggleSidebar}
                    className="text-white bg-gray-800 p-2 rounded-full focus:outline-none"
                >
                    {isOpen ? 'Close' : 'Menu'}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-64 md:flex md:flex-col z-40`}
            >
                <div className="flex flex-col items-center py-6 border-b border-gray-700 overflow-y-auto">
                    <Image
                        src="/app/images/defaultProfile.png"
                        alt="Profile"
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full border-4 border-gray-600 mb-3"
                    />
                    <p className="text-xl font-bold mb-2">User Name</p>
                    <p className="text-gray-400 mb-4">user@example.com</p>
                    <div className="w-3/4 text-center py-2 bg-slate-500 rounded-lg hover:bg-gray-700">
                        <Link href="/profile" className="block w-full px-4 py-2 text-center">
                            View Profile
                        </Link>
                    </div>
                </div>
                <ul className="mt-4 overflow-y-auto">
                    <li className="w-full py-3 hover:bg-gray-700">
                        <Link href="/dashboard" className="block w-full px-4 py-3">
                            Dashboard
                        </Link>
                    </li>
                    <li className="w-full py-3 hover:bg-gray-700">
                        <Link href="/addTasks" className="block w-full px-4 py-3">
                            Add Tasks
                        </Link>
                    </li>
                    <li className="w-full py-3 hover:bg-gray-700">
                        <Link href="/completed" className="block w-full px-4 py-3">
                            Completed
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Background Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
