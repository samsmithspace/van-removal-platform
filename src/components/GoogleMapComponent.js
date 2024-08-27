import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import './GoogleMapComponent.css';

const libraries = ['places', 'marker'];
const defaultCenter = {
    lat: 55.953251,
    lng: -3.188267
};
const mapId = '18b403a38f0b2a2'; // Replace this with your actual Map ID

const GoogleMapComponent = ({ onPlaceSelected }) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const [center, setCenter] = useState(defaultCenter);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [postcode, setPostcode] = useState('');
    const [addresses, setAddresses] = useState([]);

    // Access environment variables
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const getAddressApiKey = process.env.REACT_APP_GETADDRESS_API_KEY;

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: googleMapsApiKey,
        libraries,
        id: 'google-map-script',
    });

    const onLoad = useCallback((autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    }, []);

    const onPlaceChanged = useCallback(() => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            console.log('Place selected:', place);
            const location = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            setCenter(location);
            setMarkerPosition(location);
            onPlaceSelected(place);

            // Extract postcode if available
            const addressComponents = place.address_components;
            const postalCodeComponent = addressComponents.find(component => component.types.includes("postal_code"));
            if (postalCodeComponent) {
                const extractedPostcode = postalCodeComponent.long_name;
                setPostcode(extractedPostcode);
            }
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    }, [autocomplete, onPlaceSelected]);

    useEffect(() => {
        if (postcode) {
            // Fetch addresses for the postcode using GetAddress.io
            fetch(`https://api.getAddress.io/find/${postcode}?api-key=${getAddressApiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.addresses) {
                        setAddresses(data.addresses);
                    } else {
                        setAddresses([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching addresses:', error);
                });
        }
    }, [postcode, getAddressApiKey]);

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="map-input-container">
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} className="map-autocomplete">
                    <input
                        type="text"
                        placeholder="Enter Location"
                        className="map-input"
                    />
                </Autocomplete>
            </div>

            {postcode && addresses.length > 0 && (
                <div className="address-dropdown">
                    <select>
                        <option value="">Select an address...</option>
                        {addresses.map((address, index) => (
                            <option key={index} value={address}>
                                {address}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {markerPosition && (
                <div className="map-container">
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
        </>
    );
};

export default GoogleMapComponent;
