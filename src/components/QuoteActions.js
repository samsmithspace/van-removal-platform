import React, { useState } from 'react';
import './QuoteActions.css';
import PromotionCode from '../components/PromotionCode';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPKEY);

const QuoteActions = ({ bookingId, price, helperprice }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [displayprice, setDisplayprice] = useState(false);
    const [loading, setLoading] = useState(false);
    const [latestPrice, setLatestPrice] = useState(price);
    const [latestHelperPrice, setLatestHelperPrice] = useState(helperprice);
    const [priceUpdated, setPriceUpdated] = useState(false);
    //const [needHelper, setNeedHelper] = useState(false); // State to track if helper is needed

    const displayhelper = price > 60 && price !== helperprice;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const applycode = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/promocode/${bookingId}/latest-price`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.price !== price || data.helperprice !== helperprice) {
                    setLatestPrice(data.price);
                    setLatestHelperPrice(data.helperprice);
                    setPriceUpdated(true);
                }
            } else {
                console.error('Error fetching latest prices:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching latest prices:', error);
        }
    };

    const handlefinalsub = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when starting the request

        try {
            // Make the request to create a Stripe checkout session
            const paymentResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings/${bookingId}/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingId, amount: latestPrice }), // Send bookingId and payment amount
            });

            // Check if the response is OK
            if (paymentResponse.ok) {
                // Parse the response to get the session ID
                const { sessionId } = await paymentResponse.json();

                // Ensure sessionId exists before redirecting
                if (sessionId) {
                    // Redirect to Stripe Checkout using the session ID
                    const stripe = await stripePromise;
                    const { error } = await stripe.redirectToCheckout({ sessionId });

                    if (error) {
                        console.error('Error redirecting to Checkout:', error);
                    }
                } else {
                    console.error('Error: No sessionId returned from the backend.');
                }
            } else {
                console.error('Error creating checkout session:', paymentResponse.statusText);
            }
        } catch (error) {
            console.error('Error during the payment process:', error);
        } finally {
            setLoading(false); // Set loading to false when the request completes
        }
    };

    const handlefinalsubHelper = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(bookingId);
        try {
            const paymentResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings/${bookingId}/create-checkout-session-helper`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingId, amount: latestHelperPrice }), // Send bookingId and payment amount
            });

            // Check if the response is OK
            if (paymentResponse.ok) {
                const { sessionId } = await paymentResponse.json();

                if (sessionId) {
                    const stripe = await stripePromise;
                    const { error } = await stripe.redirectToCheckout({ sessionId });

                    if (error) {
                        console.error('Error redirecting to Checkout:', error);
                    }
                } else {
                    console.error('Error: No sessionId returned from the backend.');
                }
            } else {
                console.error('Error creating checkout session with helper:', paymentResponse.statusText);
            }
        } catch (error) {
            console.error('Error during the payment process:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings/${bookingId}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                //const data = await response.json();
                setDisplayprice(true);
            } else {
                console.error('Error updating booking:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending contact information to backend:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="quote-actions">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h1>Contact details</h1>
                    <h3>Fill your contact details to confirm the booking, we may contact you for information if needed.</h3>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <PromotionCode bookingId={bookingId} applycode={applycode} /> {/* Pass applycode as a reference */}
                </div>

                {!displayprice && !loading && (
                    <button type="submit" className="submit-button">Confirm</button>
                )}

                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div> {/* Spinner */}
                        <p>Loading...</p> {/* Static text */}
                    </div>
                )}
            </form>

            {displayprice && (
                <div>
                    <div className="pricetag">
                        {priceUpdated ? (
                            <>
                                <p>Your price (VAT included): <s>£{price}</s> £{latestPrice}</p>
                                {displayhelper && (
                                    <p>Your price with helper (VAT included): <s>£{helperprice}</s> £{latestHelperPrice}</p>
                                )}
                            </>
                        ) : (
                            <>
                                <p>Your estimated price (VAT included): £{price}</p>
                                {displayhelper && (
                                    <p>Your estimated price with a helper (VAT included): £{helperprice}</p>
                                )}
                            </>
                        )}
                    </div>

                    {/* Buttons for booking with and without a helper */}
                    <div className="helper-buttons">
                        {displayhelper && (
                            <button
                                className="submit-button2"
                                onClick={handlefinalsubHelper}
                            >
                                Pay and Book with Helper
                            </button>
                        )}
                        <button
                            className="submit-button2"
                            onClick={handlefinalsub}
                        >
                            Pay and Book without Helper
                        </button>
                    </div>


                </div>
            )}
        </footer>
    );
};

export default QuoteActions;
