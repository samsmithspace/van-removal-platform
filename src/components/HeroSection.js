import React, { useState, useEffect } from 'react';
import './HeroSection.css'; // Ensure this file contains relevant styles
import LocationSelection from './LocationSelection';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleButtonClick = () => {
        setIsVisible(true);
    };

    useEffect(() => {
        if (isVisible) {
            const section = document.getElementById('location-selection-section');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [isVisible]); // This effect runs when `isVisible` changes

    return (
        <div>
            <div className="hero-section d-flex align-items-center justify-content-center text-center">
                <div className="hero-content text-white">
                    <h1 className="display-4">Eremovals</h1>
                    <h2>Reliable and Affordable Van Removal Services For Students</h2>
                    <p className="lead">Get your instant quote today</p>
                    <button className="btn btn-custom btn-lg" onClick={handleButtonClick}>
                        Get an Instant Quote
                    </button>
                </div>
            </div>

            {isVisible && (
                <div id="location-selection-section" className="location-selection-section visible">
                    <LocationSelection />
                </div>
            )}
        </div>
    );
};

export default HeroSection;
