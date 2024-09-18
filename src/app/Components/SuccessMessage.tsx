 
import React from 'react';
import Link from 'next/link';
import styles from '../../styles/SuccessMessage.module.css'; 

interface SuccessMessageProps {
    message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
    return (
        <div className={styles.successMessage}>
            <h2>{message}</h2>
            <Link href="/signin">
                <a className={styles.link}>Proceed to Sign-In</a>
            </Link>
        </div>
    );
};

export default SuccessMessage;
