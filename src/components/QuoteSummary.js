import React, { useState, useEffect } from 'react';
import './QuoteSummary.css';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places', 'marker'];

const QuoteSummary = ({ moveType, details, date, time, start, dest, confirmDetail, bookid }) => {
    const [distance, setDistance] = useState(null);
    const [hideConfirmButton, setHideConfirmButton] = useState(false);
    const [price, setPrice] = useState('');
    const [helperprice,setHelperprice] = useState('');

    // Load Google Maps API using useJsApiLoader hook
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your actual Google Maps API key
        libraries,
    });

    useEffect(() => {
        if (isLoaded && start && dest) {
            const service = new window.google.maps.DistanceMatrixService();
            // Wrap getDistanceMatrix in a Promise
            const getDistance = () => {
                return new Promise((resolve, reject) => {
                    service.getDistanceMatrix(
                        {
                            origins: [start],
                            destinations: [dest],
                            travelMode: window.google.maps.TravelMode.DRIVING,
                        },
                        (response, status) => {
                            if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
                                resolve(response.rows[0].elements[0].distance.text);
                            } else {
                                reject('Error fetching distance: ' + status);
                            }
                        }
                    );
                });
            };

            // Call the Promise and handle success/failure
            getDistance()
                .then(distance => setDistance(distance))
                .catch(error => console.error(error));
        }
    }, [isLoaded, start, dest]);

    const confirm = async () => {
        // Call the confirmDetail function
        confirmDetail();

        // Send the data to the backend
        const bookingData = {
            startLocation: start,
            destinationLocation: dest,
            moveType,
            details,
            date,
            time,
            distance,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Booking saved:', data);
                setPrice(data.booking.price);
                setHelperprice(data.booking.helperprice);
                bookid(data.booking._id);
            } else {
                console.error('Error saving booking:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }

        // Hide the confirm button
        setHideConfirmButton(true);
    };

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <section className="quote-summary">
            <h1>Summary</h1>
            <div className="quote-details-container">
                <div className="quote-details">
                    <div>
                        <p>From: {start}</p>
                        <p>To: {dest}</p>
                    </div>
                    <h4>Distance: {distance}</h4>
                    <p>Move Type: {moveType === 'student' ? 'Student Move' : 'House Move'}</p>
                    {moveType === 'student' && details.boxDetails && (
                        <div>
                            <h4>Item Details:</h4>
                            {details.boxDetails.map((boxDetail, index) => (
                                <p key={index}>
                                    {boxDetail.numberOfBoxes} {boxDetail.boxSize} box{boxDetail.numberOfBoxes !== 1 ? 'es' : ''}
                                </p>
                            ))}
                            <p>Lift Available: {details.liftAvailable ? 'Yes' : 'No'}</p>
                            {!details.liftAvailable && details.numberOfStairs > 0 && (
                                <p>Number of Stairs: {details.numberOfStairs}</p>
                            )}
                        </div>
                    )}

                    {details.specialItems && details.specialItems.length > 0 && (
                        <div>
                            <h4>Special Items:</h4>
                            {details.specialItems.map((item, index) => (
                                <p key={index}>
                                    {item.type}: {item.description}
                                </p>
                            ))}
                        </div>
                    )}
                    <div>
                        <h4>Moving Date & Time:</h4>
                        <p>Date: {date}</p>
                        <p>Time: {time}</p>
                    </div>
                </div>
                {!hideConfirmButton && (
                    <div className="confirm-button-container">
                        <button className="confirm-button" onClick={confirm}>
                            Confirm
                        </button>
                    </div>
                )}
                {hideConfirmButton && (
                    <div className="pricetag">
                        <p>Your estimated price (VAT included): £{price}</p>
                        <p>Your estimated price with a helper (VAT included): £{helperprice}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default QuoteSummary;
