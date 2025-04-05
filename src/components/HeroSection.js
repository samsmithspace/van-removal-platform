// HeroSection.js
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';
import bt21 from '../assets/images/bt21.png';
import bt23 from '../assets/images/btn3.png';
import bt24 from '../assets/images/btn4.png';
import slidingImage from '../assets/images/vanvan.png'; // Replace with actual image
import { FaPhone } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HeroSection = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [slideIn, setSlideIn] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => setSlideIn(true), 500); // Delay before sliding in
    }, []);

    const handleStudentMoveClick = () => {
        navigate('/location', { state: { locationType: 'student' } });
    };

    const handleHouseMoveClick = () => {
        navigate('/location', { state: { locationType: 'house' } });
    };

    const handleSameDayMoveClick = () => {
        navigate('/location', { state: { locationType: 'house' } });
    };

    return (
        <div className="hero-container">
            <header className={`header ${scrollPosition > 0 ? 'scrolled' : ''}`}>
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="header-left d-flex align-items-center">
                        <h1 className="site-title">{t('siteTitle')}</h1>
                    </div>
                    <div className="header-right d-flex align-items-center">
                        <a href="tel:07404228217" className="phone-link">
                            <FaPhone className="phone-icon" />
                        </a>
                        <select
                            value={i18n.language}
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                            className="lang-select"
                        >
                            <option value="en">English</option>
                            <option value="zh">中文</option>
                        </select>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="hero-section d-flex align-items-center justify-content-center text-center">
                <div className="hero-content text-white">
                    <h2>{t('heroHeading')}</h2>
                    <div className="move-buttons-container">
                        <button className="btn2 st" onClick={handleStudentMoveClick}>
                            <span className="btn-text">{t('studentMove')}</span>
                            <img
                                src={bt21}
                                alt="Decoration"
                                className="btn2-img"
                                width="420"
                                height="auto"
                                loading="lazy"
                            />
                        </button>
                        <button className="btn2 hm" onClick={handleHouseMoveClick}>
                            <span className="btn-text">{t('homeMove')}</span>
                            <img
                                src={bt23}
                                alt="Decoration"
                                className="btn3-img"
                                width="340"
                                height="auto"
                                loading="lazy"
                            />
                        </button>
                        <button className="btn2 sd" onClick={handleSameDayMoveClick}>
                            <span className="btn-text">{t('sameDayMove')}</span>
                            <img
                                src={bt24}
                                alt="Decoration"
                                className="btn4-img"
                                width="320"
                                height="auto"
                                loading="lazy"
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sliding Image */}
            <div className="sliding-image-container">
                <img
                    src={slidingImage}
                    alt="Sliding effect"
                    className={`sliding-image ${slideIn ? 'slide-in' : ''}`}
                    width="300"
                    height="auto"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default HeroSection;
