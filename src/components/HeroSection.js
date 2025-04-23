// HeroSection.js
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './HeroSection.css';
import { useParams, useNavigate } from 'react-router-dom';

import bt21 from '../assets/images/bt21.png';
import bt23 from '../assets/images/btn3.png';
import bt24 from '../assets/images/btn4.png';
import slidingImage from '../assets/images/vanb.png';
import { FaPhone} from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.min.css';

import shelfImage from '../assets/images/shelf.png';

import binimg from '../assets/images/disp.png';
import cleanimg from '../assets/images/clean.png';
import shelf2 from '../assets/images/shelfwithbox.png';
const HeroSection = () => {
    const { lang } = useParams();
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
        setTimeout(() => setSlideIn(true), 500);
    }, []);

    const handleStudentMoveClick = () => {
        navigate(`/${lang}/location`, {
            state: { locationType: 'student' }
        });
    };

    const handleHouseMoveClick = () => {
        navigate(`/${lang}/location`, { state: { locationType: 'house' } });
    };

    const handleSameDayMoveClick = () => {
        navigate(`/${lang}/location`, { state: { locationType: 'house' } });
    };

    // New handlers for additional services
    const handleClearanceClick = () => {
        navigate(`/${lang}/contact`);
    };

    const handleCleaningClick = () => {
        navigate(`/${lang}/contact`);
    };

    const handleStorageClick = () => {
        navigate(`/${lang}/contact`);
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
            <div className="hero-section d-flex align-items-center justify-content-center">
                <div className="content-card">
                    <div className="hero-content text-white">
                        <h2 className="main-heading">{t('heroHeading')}</h2>

                        <div className="services-container">
                            <div className="service-group">
                                <h3 className="service-heading">Moving Services</h3>
                                <div className="move-buttons-container">
                                    <button className="btn2 st" onClick={handleStudentMoveClick}>
                                        <span className="btn-text">{t('studentMove')}</span>
                                        <img
                                            src={bt21}
                                            alt="Student move"
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
                                            alt="Home move"
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
                                            alt="Same day move"
                                            className="btn4-img"
                                            width="320"
                                            height="auto"
                                            loading="lazy"
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Additional Services Section */}
                            <div className="service-group additional">
                                <h3 className="service-heading">Additional Services</h3>
                                <div className="additional-services-container">
                                    <button
                                        className="service-btn storage"
                                        onClick={handleStorageClick}
                                    >
                                        <img
                                            src={shelf2}
                                            alt="Clearance background"
                                            className="button-bg-image-store"
                                        />
                                        <span className="service-name">Storage</span>
                                    </button>
                                    <button
                                        className="service-btn clearance"
                                        onClick={handleClearanceClick}
                                    >
                                        <img
                                            src={binimg}
                                            alt="Clearance background"
                                            className="button-bg-image-width"
                                        />
                                        <span className="service-name">Clearance & Disposal</span>
                                    </button>

                                    <button
                                        className="service-btn cleaning"
                                        onClick={handleCleaningClick}
                                    >
                                        <img
                                            src={cleanimg}
                                            alt="Clearance background"
                                            className="button-bg-image"
                                        />
                                        <span className="service-name">Cleaning Service</span>
                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Static Images with Animation */}
            <div className="static-images-container">
                {/* Left Shelf Image */}
                <div className="static-image left-image">
                    <img
                        src={shelfImage}
                        alt="Storage shelf"
                        className={`animate-image from-left ${slideIn ? 'visible' : ''}`}
                        width="600"
                        height="auto"
                        loading="lazy"
                    />
                </div>

                {/* Right Van Image */}
                <div className="static-image right-image">
                    <img
                        src={slidingImage}
                        alt="Moving van"
                        className={`animate-image from-right ${slideIn ? 'visible' : ''}`}
                        width="600"
                        height="auto"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
