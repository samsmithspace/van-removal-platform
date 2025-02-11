import React from 'react';
import { useTranslation } from 'react-i18next';
import './ServiceOverview.css';

const ServiceOverview = () => {
    const { t } = useTranslation();

    const services = [
        { icon: 'path/to/icon1.svg', title: t('services.moving.title'), description: t('services.moving.description') },
        { icon: 'path/to/icon2.svg', title: t('services.packing.title'), description: t('services.packing.description') },
    ];

    return (
        <div>
            {/* Service Overview Section */}
            <div className="service-overview">
                <div className="why-choose-us">
                    <h3 style={{ textAlign: 'center' }}>{t('whyChooseUs')}</h3>
                    <ul>
                        {t('whyChooseUsPoints', { returnObjects: true }).map((point, index) => (
                            <p key={index}>{point}</p>
                        ))}
                    </ul>
                </div>
                <h1>{t('ourServices')}</h1>
                <div className="row text-center">
                    {services.map((service, index) => (
                        <div key={index} className="col-12 col-md-4 service-item">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceOverview;
