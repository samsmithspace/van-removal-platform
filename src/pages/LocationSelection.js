import React, { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import GoogleMapComponent from '../components/GoogleMapComponent';
import '../components/LocationSelection.css';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
const LocationSelection = () => {
    const location = useLocation();
    const { lang } = useParams();
    const [startLocation, setStartLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook
    const isDevelopMode = process.env.REACT_APP_MODE === 'develop';
    // Handle the selection of the start location
    const locationType = location.state || {}
    const { t } = useTranslation(); // Initialize translation hook

    const handleStartLocationSelected = (place) => {

        if(isDevelopMode) {
            setStartLocation(place.formatted_address || place.name);
        }else{
            setStartLocation(place);
        }


    };
    // Handle the selection of the destination location
    const handleDestinationLocationSelected = (place) => {
        //setDestinationLocation(place);
        setDestinationLocation(place.formatted_address || place.name);
        if(isDevelopMode) {
            setDestinationLocation(place.formatted_address || place.name);
        }else{
            setDestinationLocation(place);
        }

    };

    const handleConfirm = () => {
        if (startLocation && destinationLocation) {

            navigate(`/${lang}/quote`, {
                state: { startLocation, destinationLocation, locationType}
            }); // Pass data when navigating
        }
    };

    return (
        <div className="location_selection">
            {/* Start Location Section - Always visible */}
            <div className="start-location-section">
                <h2>{t('moveFrom')}</h2>
                <GoogleMapComponent
                    onPlaceSelected={handleStartLocationSelected}
                />
            </div>

            {/* Destination Location Section - Displayed and animated after selecting the start location */}
            <div className={`destination-location-section ${startLocation ? 'slide-up' : ''}`}>
                <h2>{t('moveTo')}</h2>
                <GoogleMapComponent
                    onPlaceSelected={handleDestinationLocationSelected}
                />
            </div>

            {/* Confirm Button - Displayed after both locations are selected */}
            {startLocation && destinationLocation && (
                <button className="btn-custom" onClick={handleConfirm}>
                    {t('confirmLocations')}
                </button>
            )}
        </div>
    );
};

export default LocationSelection;
