'use client';

import React, { useState } from 'react';
import { signUp } from '../api/auth'; 
import Modal from './Modal';
import styles from '../styles/SignUp.module.css';

interface SignUpProps {
    onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
    
        try {
            console.log('Sending data:', { username, email, password });  
            const response = await signUp({ username, email, password });
            console.log('Sign-up response:', response);  

            if (response.message === 'User registered successfully') {
                setSuccess(true);
                setTimeout(() => {
                    handleCloseModal();  
                }, 1000);
            } else {
                setError('Unexpected response: ' + response.message);
                setTimeout(() => {
                    handleCloseModal();  
                }, 1000);
            }
        } catch (error: any) {
            console.error('Sign-up error:', error.response?.data || error.message);  
            setError(error.response?.data?.message || 'Sign-up failed. Please try again!');
        }
    };

    const handleCloseModal = () => {
        setSuccess(false);
        setError('');
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={handleCloseModal}>×</button>
                {success && <Modal message="Sign-Up Successful!" onClose={handleCloseModal} />}
                {error && <Modal message={error} onClose={handleCloseModal} />}
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
