import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm'; // Create a new PaymentForm component
import '../components/BookingResult.css';
// Initialize Stripe outside of your component to avoid re-creating it on every render


const BookingResult = () => {
    const location = useLocation();
    const bookingDetails = location.state?.bookingDetails;
    if (!bookingDetails) {
        return <div>Loading booking details...</div>; // Or handle the error appropriately
    }
    return (
        <div>
            <p> </p>
            <PaymentForm bookingDetails={bookingDetails} />
            <p> </p>
        </div>
    );
};

export default BookingResult;
