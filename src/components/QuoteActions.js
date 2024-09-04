import React, { useState } from 'react';
import './QuoteActions.css';
import { useNavigate } from 'react-router-dom';

const QuoteActions = ({ bookingId,price,helperprice,displayhelper }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [displayprice, setDisplayprice] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [data, setData] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handlefinalsub = async () => {
        navigate('/booking-result', { state: { bookingDetails: data.booking } }); // Navigate to booking result page
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

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
                //onSubmit();
                setDisplayprice(true);

            } else {
                console.error('Error updating booking:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending contact information to backend:', error);
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
                {!displayprice && (
                <button type="submit" className="submit-button">Confirm</button>
                )}
            </form>
            {displayprice && (
                <div>
                    <div className="pricetag">
                        {price === '' ? (
                            <div className="loader">Calculating price...</div> // Display a loader if price is empty
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
