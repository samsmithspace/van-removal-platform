import React, { useState } from 'react';
import './QuoteActions.css';

const QuoteActions = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can pass the formData to the parent component or handle it here
        onSubmit(formData);
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
