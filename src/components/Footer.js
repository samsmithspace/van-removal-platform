import React from 'react';
import './Footer.css'; // Add relevant CSS for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Contact us: +123 456 7890 | eremovals.uk</p>
                <div className="social-icons">
                    <img src="path/to/facebook-icon.svg" alt="Facebook" />
                    <img src="path/to/twitter-icon.svg" alt="Twitter" />
                    <img src="path/to/instagram-icon.svg" alt="Instagram" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
