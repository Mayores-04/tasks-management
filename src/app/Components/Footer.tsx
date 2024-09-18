// components/Footer.tsx
import React from 'react';
import styles from '../styles/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerLeft}>
                    <div className={styles.footerLogo}>
                        <FontAwesomeIcon icon={faBook} size="2x" />
                    </div>
                    <p>&copy; 2024 TaskFlow</p>
                    <p>Empowering your productivity, one task at a time.</p>
                    <p>For support, contact us at support@taskflow.com</p>
                    <p>
                        Follow us on 
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a>, 
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a>, and 
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
                    </p>
                    <p>
                        <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
                    </p>
                    <div className={styles.socialMediaIcons}>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} size="2x" color="#4267B2" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} size="2x" color="#1DA1F2" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} size="2x" color="#0077B5" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size="2x" color="#C13584" />
                        </a>
                    </div>
                </div>

                <div className={styles.footerRight}>
                    <h4>Resources</h4>
                    <p><a href="#">Learn</a></p>
                    <p><a href="#">Articles</a></p>
                    <p><a href="#">Community</a></p>
                    <p><a href="#">Privacy Policy</a></p>
                    <p><a href="#">Support</a></p>
                    <p><a href="#">Developers</a></p>
                    <p><a href="#">Policies & Terms</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
