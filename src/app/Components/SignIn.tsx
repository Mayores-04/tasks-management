 
import React, { useState } from 'react';
import { signIn } from '../api/auth';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import styles from '../styles/SignIn.module.css';

interface SignInProps {
    onClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signIn({ email, password });
            if (response.token) {
                setSuccess(true);
                localStorage.setItem('token', response.token);
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            } else {
                setError('Invalid credentials');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Please try again!');
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
                {success && <Modal message="Sign-In Successful!" onClose={handleCloseModal} />}
                {error && <Modal message={error} onClose={handleCloseModal} />}
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <h2>Sign In</h2>
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
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
