import React, { useState } from 'react';
import '../components/BookingPage.css'; // Optional: Import your CSS for styling

const BookingPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you would typically send the booking data to your backend API
        const bookingDetails = {
            name,
            email,
            date,
            time,
        };

        console.log('Booking Details:', bookingDetails);

        // Simulate form submission success
        setMessage('Booking submitted successfully!');

        // Clear the form fields after submission
        setName('');
        setEmail('');
        setDate('');
        setTime('');
    };

    return (
        <div className="booking-page">
            <h2>Book Your Appointment</h2>
            <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">Submit Booking</button>
            </form>

            {message && <p className="success-message">{message}</p>}
        </div>
    );
};

export default BookingPage;
