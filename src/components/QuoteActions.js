import React, { useState } from 'react';
import './QuoteActions.css';
import { useNavigate } from 'react-router-dom';

const QuoteActions = ({ bookingId, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

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

                onSubmit(formData);

                navigate('/booking-result', { state: { bookingDetails: data.booking } }); // Navigate to booking result page
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
                <button type="submit" className="submit-button">Confirm</button>
            </form>
        </footer>
    );
};

export default QuoteActions;
