import React from 'react';
import { useTranslation } from 'react-i18next';
import './ServiceOverview.css';
import mov from '../assets/images/moving.png';
import pac from '../assets/images/packing.png';
const ServiceOverview = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: mov,
            title: t('services.moving.title'),
            description: t('services.moving.description')
        },
        {
            icon: pac,
            title: t('services.packing.title'),
            description: t('services.packing.description')
        },
    ];

    return (
        <section className="service-overview-section">
            {/* Why Choose Us */}
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t('whyChooseUs')}</h2>
                    <div className="section-underline"></div>
                </div>

                <div className="why-choose-us">
                    <ul className="benefits-list">
                        {t('whyChooseUsPoints', { returnObjects: true }).map((point, index) => (
                            <li key={index} className="benefit-item">
                                <span className="benefit-icon">✓</span>
                                <span className="benefit-text">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Our Services */}
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t('ourServices')}</h2>
                    <div className="section-underline"></div>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">
                                <img src={service.icon} alt={service.title} />
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <a href="#" className="service-link">{t('learnMore')} →</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceOverview;
