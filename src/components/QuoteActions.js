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
    const navigate = useNavigate();
    const [data, setData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
                    <h3>Fill your contact details to confirm the booking, we may contact you for information if
                        needed.</h3>
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
                    <PromotionCode bookingId={bookingId} />
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
                        {price === '' ? (
                            <div className="loader">Calculating price...</div>
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
