"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { faBook, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

interface User {
    email: string;
    phone: string;
    website: string;
    age: number;
    course: string;
    status: string;
    work: string;
}

const UserProfile: React.FC = () => {
    // Default values
    const defaultName = "Guest User";
    const defaultImage = "/images/defaultprofile.png"; // Correct path
    const defaultStatus = "🔵 Available";

    // State for user information
    const [userName, setUserName] = useState<string>("Jake J. Mayores (they/them)");
    const [profileImage, setProfileImage] = useState<string>(() => {
        return localStorage.getItem('profileImage') || defaultImage;
    });
    const [userStatus, setUserStatus] = useState<string>("🔴 Busy");

    const [user, setUser] = useState<User>({
        email: "jakemayores05@gmail.com",
        phone: "09701275112",
        website: "https://mayores04.github.io/Jake_Mayores/",
        age: 19,
        course: "Bachelor of Science in Computer Science",
        status: "🔴 Busy",
        work: "No work information available."
    });

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleLogout = () => {
        setUserName(defaultName);
        setProfileImage(defaultImage);
        setUserStatus(defaultStatus);
        localStorage.removeItem('profileImage');
        setUser({
            email: "",
            phone: "",
            website: "",
            age: 0,
            course: "",
            status: "",
            work: "No work information available."
        });
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value;
        setUserStatus(newStatus);
        setUser(prevState => ({ ...prevState, status: newStatus }));
    };

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImage = reader.result as string;
                setProfileImage(newImage);
                localStorage.setItem('profileImage', newImage);
                setIsModalOpen(false);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-8">
            <div className="bg-white shadow-lg rounded-lg max-w-6xl w-full md:w-11/12 lg:w-3/4 xl:w-2/3 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold flex items-center">
                        <FontAwesomeIcon icon={faBook} className='mr-2' />TaskFlow
                    </h1>
                    <div className="mt-4 sm:mt-0 flex flex-wrap justify-center sm:justify-end">
                        <Link href="/dashboard">
                            <button className="bg-gray-200 px-4 py-2 rounded mr-2 mb-2 sm:mb-0">
                                Dashboard
                            </button>
                        </Link>
                        <Link href="/addTasks">
                            <button className="bg-black text-white px-4 py-2 rounded">
                                Task Management
                            </button>
                        </Link>
                    </div>
                </div>

                {user ? (
                    <>
                        <div className="flex flex-col sm:flex-row items-center mb-4">
                            <div className='flex flex-row items-start justify-center space-y-4 mb-5'>
                                <div className="flex flex-col items-center">
                                    <Image
                                        src={profileImage}
                                        alt="Profile"
                                        width={96} // Specify width
                                        height={96} // Specify height
                                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-gray-300 object-cover cursor-pointer"

                                    />
                                    <button onClick={handleImageClick} className='-mt-10 ml-12 w-auto p-2 rounded-lg text-white hover:bg-slate-600 hover:shadow-lg transition duration-300 ease-in-out'>
                                        <FontAwesomeIcon icon={faImage} size='xl'/>
                                    </button>
                                    <button
                                        className='mt-4 w-auto p-2 rounded-lg bg-slate-500 text-white hover:bg-slate-600 hover:shadow-lg transition duration-300 ease-in-out'
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                                    <h2 className="text-xl font-bold">{userName}</h2>
                                    <p className="text-gray-600">{user.course}</p>
                                    <select
                                        value={userStatus}
                                        onChange={handleStatusChange}
                                        className="inline-block bg-gray-200 px-2 py-1 rounded mt-2"
                                    >
                                        <option value="🔵 Available">🔵 Available</option>
                                        <option value="🔴 Busy">🔴 Busy</option>
                                        <option value="🟡 Away">🟡 Away</option>
                                        <option value="⚪️ Offline">⚪️ Offline</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded">
                                <h3 className="text-lg font-semibold">Contact</h3>
                                <p>Email: <a href={`mailto:${user.email}`} className="text-blue-500">{user.email}</a></p>
                                <p>Phone: {user.phone}</p>
                                <p>Website: <a href={user.website} className="text-blue-500" target="_blank" rel="noopener noreferrer">{user.website}</a></p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded">
                                <h3 className="text-lg font-semibold">Information</h3>
                                <p>Age: {user.age}</p>
                                <p>Course: {user.course}</p>
                                <p>Email: <a href={`mailto:${user.email}`} className="text-blue-500">{user.email}</a></p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded">
                                <h3 className="text-lg font-semibold">Work</h3>
                                <p>{user.work}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <p className="text-lg">You have logged out.</p>
                    </div>
                )}
            </div>

            {/* Modal for image zoom and edit */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-4 max-w-lg w-full">
                        <Image
                            src={profileImage}
                            alt="Profile Zoomed"
                            width={500} // Specify width
                            height={500} // Specify height
                            className="w-full h-auto rounded-lg mb-4"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleModalClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
