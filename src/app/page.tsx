"use client";
import React, { useState } from 'react';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Image from 'next/image';
import introImage from './images/intro.png';
import dashboard from './images/Dashboard.png';
import Footer from './Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/WelcomePage.module.css';
import UserProfile from './images/defaultPtofile.png';
import Reporting from './Components/Reporting';

const HomePage: React.FC = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showReporting, setShowReporting] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleSignUpOpen = () => setShowSignUp(true);
    const handleSignUpClose = () => setShowSignUp(false);

    const handleSignInOpen = () => setShowSignIn(true);
    const handleSignInClose = () => setShowSignIn(false);

    const handleReportingOpen = () => setShowReporting(true);
    const handleReportingClose = () => setShowReporting(false);

    const handleProfileOpen = () => setShowProfile(true);
    const handleProfileClose = () => setShowProfile(false);

    const toggleTryNow = () => {
        setShowSignUp(true);
    }
    return (
        <>
            <div className="header">
                <div className="project-name">
                    <FontAwesomeIcon icon={faBook} size="2xl" />
                    <h1>TaskFlow</h1>
                </div>
                {!showSignUp && !showSignIn && (
                    <div className="authButtons">
                        <button
                            className="bg-gray-600 text-white py-2 px-4 rounded mr-2.5 hover:bg-gray-900 transition duration-300 ease-in-out shadow-md"
                            onClick={handleSignInOpen}
                        >
                            Sign In
                        </button>
                        <button
                            className="bg-gray-800 text-white py-2 px-4 rounded mr-2.5 hover:bg-gray-900 transition duration-300 ease-in-out shadow-md"
                            onClick={handleSignUpOpen}
                        >
                            Sign Up
                        </button>
                    </div>
                )}
                {showSignUp && <SignUp onClose={handleSignUpClose} />}
                {showSignIn && <SignIn onClose={handleSignInClose} />}
            </div>

            <main className="welcomepage-main-container">
                <div className="introduction-container">
                    <h1>Organize today, succeed tomorrow.</h1>
                    <Image
                        src={introImage}
                        alt="Introduction"
                        className="intro-image"
                    />
                    <p className="intro-paragraph mt-3">
                        TaskFlow is a project management
                        platform designed to empower
                        small teams, helping them
                        accelerate their workflow and
                        achieve more than they ever
                        imagined possible.
                    </p>
                    <button className="try-now-button bg-gray-400 hover:bg-slate-900" onClick={toggleTryNow}>Try it Now!</button>
                </div>

                <div className="overview">
                    <div className="overview-link">
                        <div className={styles.featureCard}>
                            <Image
                                src={dashboard}
                                alt="Dashboard"
                                className={styles.featureImage}
                                onClick={handleReportingOpen}
                            />
                        </div>
                        <div className={styles.featureCard}>
                            <Image
                                src={UserProfile}
                                alt="Task Management"
                                className={styles.featureImage}
                                onClick={handleProfileOpen}
                            />
                        </div>
                    </div>

                    <div className={styles.overviewText}>
                        <div className="align-middle text-left">
                            <h2 className={styles.overviewTextH2}>Streamline your tasks and achieve more with TaskFlow.</h2>
                            <p>
                                Simplify your workflow and stay organized with our intuitive tools. Track progress effortlessly and reach your goals with ease.
                            </p>
                            <p>
                                Transform the way you manage projects. Stay on top of deadlines and boost your productivity with our easy-to-use platform.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {showReporting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
                        <button
                            onClick={handleReportingClose}
                            className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded-full"
                        >
                            &times;
                        </button>
                        <Reporting />
                    </div>
                </div>
            )}

            {showProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
                        <button
                            onClick={handleProfileClose}
                            className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded-full"
                        >
                            &times;
                        </button>
                        <Image
                            src={UserProfile} 
                            alt="User Profile"
                            className="rounded-lg w-full h-auto" 
                        />
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default HomePage;
