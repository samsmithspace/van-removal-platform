// ContactPage.js
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaQuoteLeft } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
    const { lang } = useParams();
    const { t, i18n } = useTranslation();
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

    return (
        <div className="contact-container">
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

            <div className="contact-section">
                <div className="contact-card">
                    <div className="quote-icon">
                        <FaQuoteLeft />
                    </div>

                    <h1 className="contact-title">Get Your Personalized Quote</h1>

                    <p className="contact-description">
                        For the most accurate and competitive pricing, please contact us directly through WhatsApp or phone.
                        Our team will assess your specific requirements and provide you with a customized quote.
                    </p>

                    <div className="benefits-list">
                        <div className="benefit-item">
                            <span className="benefit-checkmark">✓</span>
                            <span className="benefit-text-con">Fast response within hours</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-checkmark">✓</span>
                            <span className="benefit-text-con">Personalized service tailored to your needs</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-checkmark">✓</span>
                            <span className="benefit-text-con">Transparent pricing with no hidden fees</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-checkmark">✓</span>
                            <span className="benefit-text-con">Flexible scheduling options</span>
                        </div>
                    </div>

                    <div className="contact-options">
                        <a href="https://wa.me/447404228217" className="contact-button whatsapp-button">
                            <FaWhatsapp className="contact-icon" />
                            <span>Contact via WhatsApp</span>
                        </a>

                        <a href="tel:07404228217" className="contact-button phone-button">
                            <FaPhone className="contact-icon" />
                            <span>Call Us: 07404 228217</span>
                        </a>
                    </div>

                    <p className="contact-note">
                        We're available 7 days a week from 8:00 AM to 8:00 PM to assist you with your moving and service needs.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
