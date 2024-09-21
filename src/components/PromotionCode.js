import React, { useState } from 'react';
import './PromotionCode.css';

const PromotionCode = ({ bookingId, applycode }) => { // applycode passed as prop
    const [promoCode, setPromoCode] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setPromoCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if promo code is exactly 6 characters long
        if (promoCode.length !== 6) {
            setMessage('Invalid promotion code. It must be exactly 6 characters long.');
            return; // Exit the function if the code is invalid
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/promocode/${bookingId}/apply-promo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ promoCode })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Promotion code applied! You get a discount of ${data.discount}% off`);
                applycode(); // Call applycode after successful promo code application
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || 'Invalid promotion code. Please try again.');
                console.error('Error applying promo code:', errorData.error || response.statusText);
            }
        } catch (error) {
            setMessage('Error applying promo code. Please try again later.');
            console.error('Error sending promo code to backend:', error);
        }
    };

    return (
        <div className="form-group">
            <label htmlFor="promoCode">Promotion Code:</label>
            <input
                type="text"
                id="promoCode"
                value={promoCode}
                placeholder="Optional"
                onChange={handleChange}
            />
            <button onClick={handleSubmit} className="submit-button3">Apply Code</button>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default PromotionCode;

