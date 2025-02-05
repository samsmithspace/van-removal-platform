import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import './GoogleMapComponent.css';
import { useTranslation } from 'react-i18next';
const libraries = ['places', 'marker'];

const defaultCenter = {
    lat: 55.953251,
    lng: -3.188267
};

const mapId = '18b403a38f0b2a2'; // Replace this with your actual Map ID

const GoogleMapComponent = ({ onPlaceSelected }) => {
    const { t } = useTranslation(); // Initialize translation hook
    const [autocomplete, setAutocomplete] = useState(null);
    const [center, setCenter] = useState(defaultCenter);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [postcode, setPostcode] = useState('');
    const [addresses, setAddresses] = useState([]);


    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const getAddressApiKey = process.env.REACT_APP_GETADDRESS_API_KEY;
    const isDevelopMode = process.env.REACT_APP_MODE === 'develop';
    //const isDevelopMode = true;
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: googleMapsApiKey,
        libraries,
    });
    // Load the getAddress.io script dynamically
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.getaddress.io/scripts/getaddress-find-2.0.0.min.js";
        script.async = true;
        script.onload = () => {
            window.getAddress.find("getaddress-container", getAddressApiKey);
        };
        document.body.appendChild(script);

        // Cleanup script from the DOM
        return () => {
            document.body.removeChild(script);
        };
    }, [getAddressApiKey]);

    useEffect(() => {
        // Handle the address selected event
        const handleAddressSelected = (e) => {
            const address = e.detail.address;
            const latLng = { lat: address.latitude, lng: address.longitude };
            setCenter(latLng);
            setMarkerPosition(latLng);

        };

        document.addEventListener("getaddress-address-selected", handleAddressSelected);

        return () => {
            document.removeEventListener("getaddress-address-selected", handleAddressSelected);
        };
    }, []);

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

            if(isDevelopMode){
                onPlaceSelected(place);
            }

            const addressComponents = place.address_components;
            const postalCodeComponent = addressComponents.find(component => component.types.includes("postal_code"));

            if (postalCodeComponent) {
                const extractedPostcode = postalCodeComponent.long_name;
                setPostcode(extractedPostcode); // This will update the postcode state asynchronously

                // Move the fetch call inside the postcode state update block
                if (!isDevelopMode) {
                    fetch(`https://api.getAddress.io/autocomplete/${extractedPostcode}?api-key=${getAddressApiKey}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.suggestions) {
                                setAddresses(data.suggestions.map(suggestion => suggestion.address));
                            } else {
                                setAddresses([]);
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching addresses:', error);
                        });
                }
            } else {
                console.log('Postal code not found.');
            }
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    }, [getAddressApiKey, autocomplete, onPlaceSelected, isDevelopMode]);



    const handleAddressChange = useCallback((event) => {
        const selectedAddress = event.target.value;
        console.log('Selected address:', selectedAddress); // Debugging log
        if (selectedAddress) {
            onPlaceSelected(selectedAddress); // Pass the selected address to onPlaceSelected
        } else {
            console.log('No address selected or address is empty.');
        }
    }, [onPlaceSelected]);
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
                        placeholder={t('EnterLocation')}
                        className="map-input"
                    />
                </Autocomplete>
            </div>

            {postcode && process.env.REACT_APP_MODE==="production" && addresses.length > 0 && (
                <div className="address-dropdown">
                    <select className="select" onChange={handleAddressChange} style={{ textDecoration: 'underline' }}>
                        <option value="">Click here to select detailed address...</option>
                        {addresses.map((address, index) => (
                            <option key={index} value={address}>
                                {address.replace(/,/g, ', ')}
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
