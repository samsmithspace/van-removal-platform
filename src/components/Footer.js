import React from 'react';
import './Footer.css'; // Add relevant CSS for styling
import xLogo from '../assets/images/xlogo.svg';
import waLogo from '../assets/images/Digital_Glyph_Green.svg';
import igLogo from '../assets/images/Instagram_Glyph_White.svg';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Contact us: 07917784728 | eremovals.uk</p>
                <div className="social-icons">

                    <img src={xLogo} alt="X" />
                    <img src={igLogo} alt="Instagram" />
                    <img src={waLogo} alt="WhatsApp" />

                </div>
            </div>
        </footer>
    );
};

export default Footer;
