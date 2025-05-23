import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import './QuoteSummary.css';
import { useJsApiLoader } from '@react-google-maps/api';
import QuoteActions from '../components/QuoteActions';

const libraries = ['places', 'marker'];

const QuoteSummary = forwardRef(({ hideoptions,moveType, details, date, time, start, dest, confirmDetail}, ref) => {
    const [distance, setDistance] = useState(null);
    const [hideConfirmButton, setHideConfirmButton] = useState(false);
    const [price, setPrice] = useState('');
    const [helperprice, setHelperprice] = useState('');
    //const [displayhelper, setDisplayhelper] = useState(true);
    const [bid1,setbid1]=useState('');
    //const [contactsumb, setContactsumb] = useState(false);
    // Load Google Maps API using useJsApiLoader hook
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your actual Google Maps API key
        libraries,
    });

    // Function to be called by the parent
    const childFunction = () => {
        //alert('Child function called due to parent variable change!');
        // Any other logic can go here
        setHideConfirmButton(false);
    };

    // Expose childFunction to parent component using ref
    useImperativeHandle(ref, () => ({
        childFunction
    }));

    useEffect(() => {

        if (isLoaded && start && dest) {
            const service = new window.google.maps.DistanceMatrixService();
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

            getDistance()
                .then(distanceText => {
                    const convertedDistance = convertDistanceToMiles(distanceText); // Convert the distance to miles
                    setDistance(convertedDistance);
                })
                .catch(error => console.error(error));
        }
    }, [isLoaded, start, dest]);
    const convertDistanceToMiles = (distanceText) => {
        const distanceParts = distanceText.split(' ');
        const distanceValue = parseFloat(distanceParts[0]);
        const distanceUnit = distanceParts[1];

        if (distanceUnit === 'km') {
            const distanceInMiles = distanceValue * 0.621371; // Convert km to miles
            return `${distanceInMiles.toFixed(1)} mi`;
        } else if (distanceUnit === 'm') {
            const distanceInMiles = distanceValue * 0.000621371; // Convert meters to miles
            return `${distanceInMiles.toFixed(1)} mi`;
        } else {
            return distanceText; // Already in miles or unrecognized unit
        }
    };

    const confirm = async () => {
        confirmDetail();

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
               // if (data.booking.helperprice <= 60) {
               //     setDisplayhelper(false);
               // }else{
               //     setDisplayhelper(true);
               // }

                setbid1(data.booking._id);

            } else {
                console.error('Error saving booking:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
        hideoptions();
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
                    {details.boxDetails && (
                        <div>
                            <h4>Item Details:</h4>
                            {details.boxDetails.map((boxDetail, index) => (
                                <p key={index}>
                                    {boxDetail.numberOfBoxes} {boxDetail.boxSize} box{boxDetail.numberOfBoxes !== 1 ? 'es' : ''}
                                </p>
                            ))}
                            <h4>Lift Available: </h4>
                            <p>Start: {details.liftAvailable ? 'Yes' : 'No'}, {details.numberOfStairs} Stairs.</p>
                            <p>Destination: {details.liftAvailabledest ? 'Yes' : 'No'}, {details.numberofstairsright} Stairs.</p>
                            {!details.liftAvailable && details.numberOfStairs > 0 && (
                                <p>Number of Stairs: {details.numberOfStairs}</p>
                            )}
                        </div>
                    )}
                    {(moveType === 'house' ||moveType === 'student') && details.furnitureDetails && details.furnitureDetails.length > 0 && (
                        <div>
                            <h4>Furniture Details:</h4>
                            {details.furnitureDetails.map((furniture, index) => (
                                <p key={index}>
                                    {furniture.quantity} x {furniture.item}
                                </p>
                            ))}
                        </div>
                    )}
                    {(moveType === 'house' ||moveType === 'student' )&& details.applianceDetails && details.applianceDetails.length > 0 && (
                        <div>
                            <h4>Appliance Details:</h4>
                            {details.applianceDetails.map((appliance, index) => (
                                <p key={index}>
                                    {appliance.quantity} x {appliance.item}
                                </p>
                            ))}
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
                    <div>
                        <div>
                            <QuoteActions bookingId={bid1} price={price} helperprice={helperprice}
                                          />
                        </div>


                    </div>
                )}

            </div>
        </section>
    )
        ;
});

export default QuoteSummary;
