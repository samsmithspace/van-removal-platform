import React from 'react';
import './Footer.css'; // Add relevant CSS for styling
import xLogo from '../assets/images/xlogo.svg';
import waLogo from '../assets/images/Digital_Glyph_Green.svg';
import igLogo from '../assets/images/Instagram_Glyph_White.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>
                    {/* Email link */}
                    <a href="mailto:eremovalsscot@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Email Us
                    </a>
                    {' | '}
                    {/* Phone number link (example number added, change it to your actual number) */}
                    <a href="tel:+447404228217" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Call Us
                    </a>
                    {' | '}
                    {/* Terms and Conditions link */}
                    <a href="/terms-and-conditions" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Terms and Conditions
                    </a>
                </p>
                <div className="social-icons">
                    {/* Social media icons with links */}
                    <a href="https://x.com/yourprofile" target="_blank" rel="noopener noreferrer">
                        <img src={xLogo} alt="X" />
                    </a>
                    <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                        <img src={igLogo} alt="Instagram" />
                    </a>
                    <a href="https://wa.me/447404228217" target="_blank" rel="noopener noreferrer">
                        <img src={waLogo} alt="WhatsApp" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
