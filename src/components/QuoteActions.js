import React, { useState } from 'react';
import './QuoteActions.css';
import { useNavigate } from 'react-router-dom';
import PromotionCode from '../components/PromotionCode';

const QuoteActions = ({ bookingId, price, helperprice, displayhelper }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [displayprice, setDisplayprice] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [latestPrice, setLatestPrice] = useState(price); // Latest price from the backend
    const [latestHelperPrice, setLatestHelperPrice] = useState(helperprice); // Latest helper price from the backend
    const [priceUpdated, setPriceUpdated] = useState(false); // Flag to indicate if price has changed
    const navigate = useNavigate();
    const [data, setData] = useState({});

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
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.price !== price || data.helperprice !== helperprice) {
                    // Prices have changed, set new prices and mark as updated
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings/${bookingId}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Message sent");
                setData(data);
                setDisplayprice(true);
            } else {
                console.error('Error sending message:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending contact information to backend:', error);
        } finally {
            setLoading(false); // Set loading to false when the request completes
        }

        navigate('/booking-result', { state: { bookingDetails: data.booking } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when starting the request

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings/${bookingId}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Contact information added:', data);
                setData(data);
                setDisplayprice(true);
            } else {
                console.error('Error updating booking:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending contact information to backend:', error);
        } finally {
            setLoading(false); // Set loading to false when the request completes
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
                                    <>
                                        <p>Your price with helper (VAT included): <s>£{helperprice}</s> £{latestHelperPrice}</p>

                                    </>
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
                    <button className="submit-button2" onClick={handlefinalsub}>Book</button>
                </div>
            )}
        </footer>
    );
};

export default QuoteActions;
