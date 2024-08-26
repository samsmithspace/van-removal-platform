import React, { useState } from 'react';
import { GoogleMap, LoadScriptNext, Autocomplete } from '@react-google-maps/api';
import './GoogleMapComponent.css';  // Ensure the CSS file is correctly imported

const libraries = ['places', 'marker'];



const defaultCenter = {
    lat: 55.953251, // Default center
    lng: -3.188267
};

const mapId = '18b403a38f0b2a2'; // Replace this with your actual Map ID

const GoogleMapComponent = ({ onPlaceSelected, status }) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const [center, setCenter] = useState(defaultCenter); // State to manage the map's center
    const [markerPosition, setMarkerPosition] = useState(null); // State to manage the marker position

    const onLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            console.log('Place selected:', place); // Debugging
            const location = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            setCenter(location); // Update the map center
            setMarkerPosition(location); // Set the marker position
            onPlaceSelected(place);
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    return (
        <LoadScriptNext
            googleMapsApiKey="AIzaSyD5ZobmBfo03nJrlBKJ-vrTmeGpT8yqSxQ"
            libraries={libraries}
            version="beta"
            loadingElement={<div>Loading...</div>}  // Optional: provide a loading element
            className="map-load"
        >
            <div className="map-input-container"> {/* Use correct class name here */}
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} className="map-autocomplete">
                    <input
                        type="text"
                        placeholder="Enter Location"
                        className="map-input"  // Consider using a class instead of inline styles for better maintainability
                    />
                </Autocomplete>
            </div>

            {markerPosition && ( // Conditionally render the map based on selection
                <div className="map-container"> {/* Use correct class name here */}
                    <GoogleMap
                        mapContainerStyle={{ height: "100%", width: "100%" }}
                        center={center}
                        zoom={17}
                        options={{ mapId }}
                        onLoad={(map) => {
                            const { AdvancedMarkerElement } = window.google.maps.marker || {};
                            if (AdvancedMarkerElement) {
                                new AdvancedMarkerElement({ map, position: markerPosition });
                            } else {
                                console.warn("AdvancedMarkerElement is not available. Ensure you have the correct API version and libraries.");
                            }
                        }}
                    />
                </div>
            )}
        </LoadScriptNext>
    );
};

export default GoogleMapComponent;
