import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LocationSummary.css';
import { useTranslation } from 'react-i18next';
const LocationSummary = ({ startLocation, destinationLocation }) => {
    const navigate = useNavigate();

    const handleEditLocation = (locationType) => {
        navigate('/location', { state: { editLocation: locationType } });
    };
    const { t } = useTranslation();
    return (
        <div className="location-summary">
            <div className="location" onClick={() => handleEditLocation('start')}>
                <h3>{t('From')}</h3>
                <p className="editable-location">{startLocation}</p>
            </div>

            <div className="location" onClick={() => handleEditLocation('destination')}>
                <h3>{t('To')}</h3>
                <p className="editable-location">{destinationLocation}</p>
            </div>
        </div>
    );
};

export default LocationSummary;
