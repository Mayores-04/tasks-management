"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation'; 

const DashboardButton: React.FC = () => {
    const router = useRouter(); 

    const handleClick = () => {
        router.push('/dashboard'); 
    };

    return (
        <button onClick={handleClick} className="dashboard-button">
            Dashboard
        </button>
    );
};

export default DashboardButton;
