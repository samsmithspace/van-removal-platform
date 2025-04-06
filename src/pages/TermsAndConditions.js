import React from 'react';
import { useTranslation } from 'react-i18next';
import '../components/TermsAndConditions.css'; // Ensure this has your custom styles

const TermsAndConditions = () => {
    const { t } = useTranslation();
    const sections = t('terms.sections', { returnObjects: true });

    return (
        <div className="terms-container">
            <h1>{t('terms.title')}</h1>

            {sections.map((section, index) => (
                <section key={index}>
                    <h2>{section.heading}</h2>
                    <p>{section.content}</p>
                </section>
            ))}
        </div>
    );
};

export default TermsAndConditions;
