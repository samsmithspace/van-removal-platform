// PaymentForm.js
import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';

// Load the Stripe object outside of a component to avoid re-creating it on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ bookingDetails }) => {
    const fetchClientSecret = useCallback(() => {
        // Ensure bookingDetails has an ID before proceeding
        if (!bookingDetails || !bookingDetails._id) {
            console.error("Booking details are not available or booking ID is missing.");
            return Promise.reject("Booking ID is missing");
        }

        // Create a Checkout Session with the booking ID
        return fetch("http://localhost:5000/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ bookingId: bookingDetails._id }), // Send booking ID
        })
            .then((res) => res.json())
            .then((data) => data.clientSecret)
            .catch((error) => {
                console.error("Error fetching client secret:", error);
                throw error;
            });
    }, [bookingDetails]);

    const options = { fetchClientSecret };

    return (
        <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={options}
        >
            <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
    );
};

export default PaymentForm;
