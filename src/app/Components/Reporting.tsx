"use client";
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

// Define the type for your data
interface DataPoint {
    name: string;
    Created?: number;
    Completed?: number;
    Pending?: number;
    InProgress?: number;
    OnHold?: number;
    High?: number;
    Medium?: number;
    Low?: number;
    Overdue?: number;
    OnTime?: number;
}

// Sample data with the DataPoint type
const data: DataPoint[] = [
    { name: 'Total Tasks', Created: 20, Completed: 15, Pending: 5 },
    { name: 'Task Status', InProgress: 8, Completed: 15, OnHold: 2 },
    { name: 'Task Priority', High: 10, Medium: 5, Low: 5 },
    { name: 'Overdue Tasks', Overdue: 3, OnTime: 17 },
];

const Reporting: React.FC = () => {
    return (
        <div className=" items-center justify-center p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-center font-bold text-lg mb-4">Reporting</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Created" fill="#8884d8" />
                    <Bar dataKey="Completed" fill="#82ca9d" />
                    <Bar dataKey="Pending" fill="#ffc658" />
                    <Bar dataKey="InProgress" fill="#83a6ed" />
                    <Bar dataKey="OnHold" fill="#8dd1e1" />
                    <Bar dataKey="High" fill="#ff8042" />
                    <Bar dataKey="Medium" fill="#ffbb28" />
                    <Bar dataKey="Low" fill="#d0ed57" />
                    <Bar dataKey="Overdue" fill="#ff4848" />
                    <Bar dataKey="OnTime" fill="#00C49F" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Reporting;
