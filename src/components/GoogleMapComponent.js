import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import './GoogleMapComponent.css';

const mapContainerStyle = {
    height: "300px", // Height of the map
    width: "80%",    // Width of the map
    margin: "0 auto" // Center the map horizontally
};

const defaultCenter = {
    lat: 55.953251, // Default center
    lng: -3.188267
};

const mapId = '18b403a38f0b2a2'; // Replace this with your actual Map ID

const GoogleMapComponent = ({ onPlaceSelected }) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const [center, setCenter] = useState(defaultCenter); // State to manage the map's center
    const [isMapVisible, setIsMapVisible] = useState(false); // Track map visibility
    const [markerPosition, setMarkerPosition] = useState(null); // State to manage the marker position

    const onLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            const location = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            setCenter(location); // Update the map center
            setMarkerPosition(location); // Set the marker position
            setIsMapVisible(true);
            onPlaceSelected(place);
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyD5ZobmBfo03nJrlBKJ-vrTmeGpT8yqSxQ"
            libraries={['places', 'marker']} // Include the 'marker' library
            version="beta" // Use the beta version
        >
            <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
            >
                <input
                    type="text"
                    placeholder="Enter Start Location"
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `80%`, // Ensure the input takes full width of its container
                        height: `50px`, // Maintain the increased height of the input field
                        padding: `0 15px`,
                        borderRadius: `8px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `18px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        marginBottom: `10px`
                    }}
                />
            </Autocomplete>
            <p></p>
            {isMapVisible && ( // Conditionally render the map based on selection
                <div style={mapContainerStyle}>
                    <GoogleMap
                        mapContainerStyle={{ height: "100%", width: "100%" }}
                        center={center}
                        zoom={17}
                        options={{ mapId }} // Pass the Map ID here
                        onLoad={(map) => {
                            if (markerPosition) {
                                const { AdvancedMarkerElement } = window.google.maps.marker || {};

                                if (AdvancedMarkerElement) {
                                    new AdvancedMarkerElement({
                                        map,
                                        position: markerPosition
                                    });
                                } else {
                                    console.warn("AdvancedMarkerElement is not available. Ensure you have the correct API version and libraries.");
                                }
                            }
                        }}
                    >
                    </GoogleMap>
                </div>
            )}
        </LoadScript>
    );
};

export default GoogleMapComponent;
