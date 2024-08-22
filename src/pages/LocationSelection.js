import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleMapComponent from '../components/GoogleMapComponent';
import '../components/LocationSelection.css';

const LocationSelection = () => {
    const [currentPage, setCurrentPage] = useState('start'); // Manage current page
    const [startLocation, setStartLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook
    const handleStartLocationSelected = (place) => {
        setStartLocation(place.formatted_address || place.name);
    };

    const handleDestinationLocationSelected = (place) => {
        setDestinationLocation(place.formatted_address || place.name);
    };

    const handleConfirmStart = () => {
        setCurrentPage('destination'); // Move to destination selection
    };
    const handleConfirmDestination = () => {
        navigate('/quote', {
            state: { startLocation, destinationLocation }
        }); // Pass data when navigating
    };

    useEffect(() => {
        if (currentPage === 'destination') {
            const section = document.querySelector('.destination-location-section');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [currentPage]); // Run this effect when `currentPage` changes

    return (
        <div className="location_selection">
            {currentPage === 'start' && (
                <div className="start-location-section">
                    <h2>Select Start Location</h2>
                    <GoogleMapComponent
                        onPlaceSelected={handleStartLocationSelected}
                    />
                    <p></p>
                    {startLocation && (
                        <button className="btn-custom" onClick={handleConfirmStart}>
                            Confirm Start Location
                        </button>
                    )}
                </div>
            )}

            {currentPage === 'destination' && (
                <div className="destination-location-section">
                    <h2>Select Destination</h2>
                    <GoogleMapComponent
                        onPlaceSelected={handleDestinationLocationSelected}
                    />
                    <p></p>
                    {destinationLocation && (
                        <button className="btn-custom" onClick={handleConfirmDestination}>
                            Confirm Destination
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocationSelection;
