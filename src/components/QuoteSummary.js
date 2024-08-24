import React, { useState, useEffect } from 'react';
import './QuoteSummary.css';
import { Loader } from '@googlemaps/js-api-loader';

const QuoteSummary = ({ moveType, details, date, time, start, dest, confirmDetail,bookid }) => {
    const [distance, setDistance] = useState(null);
    const [hideConfirmButton, setHideConfirmButton] = useState(false);
    const [price,setprice]=useState('');
    useEffect(() => {
        if (start && dest) {
            const loader = new Loader({
                apiKey: 'AIzaSyD5ZobmBfo03nJrlBKJ-vrTmeGpT8yqSxQ', // Replace with your actual Google Maps API key
                version: 'weekly',
                libraries: ['places'],
            });

            loader.load().then(() => {
                if (window.google) {
                    const service = new window.google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                        {
                            origins: [start],
                            destinations: [dest],
                            travelMode: window.google.maps.TravelMode.DRIVING,
                        },
                        (response, status) => {
                            if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
                                setDistance(response.rows[0].elements[0].distance.text);
                            } else {
                                console.error('Error fetching distance:', status, response);
                            }
                        }
                    );
                }
            }).catch(error => {
                console.error('Google Maps API load error:', error);
            });
        }
    }, [start, dest]);

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
            distance
        };

        try {
            const response = await fetch(`https://van-backend-2niq.onrender.com/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Booking saved:', data);
                setprice(data.booking.price);
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
                        <p>Your estimated price: {price} £</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default QuoteSummary;
