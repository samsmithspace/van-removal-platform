import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import '../components/BookingResult.css';

const BookingResult = () => {
    const location = useLocation();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchBookingDetails = async () => {
            const searchParams = new URLSearchParams(location.search);
            const bookingId = searchParams.get('bookingId');

            if (bookingId) {
                try {
                    // Fetch the booking details using the booking ID
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings/${bookingId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setBookingDetails(data.booking);

                        // Check local storage if message has already been sent
                        const messageSent = localStorage.getItem(`messageSent_${bookingId}`);

                        if (!messageSent) {
                            localStorage.setItem(`messageSent_${bookingId}`, 'true'); // Mark the message as sent

                            await sendBookingDetails(bookingId);
                        }
                    } else {
                        console.error('Failed to fetch booking details:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching booking details:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.error('No bookingId found in URL');
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [location.search]);

    // Function to send booking details (called once)
    const sendBookingDetails = async (bookingId) => {
        try {
            const sendResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings/${bookingId}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingId })
            });

            if (!sendResponse.ok) {
                console.error('Failed to send booking details:', sendResponse.statusText);
            } else {
                console.log('Booking details sent successfully.');
            }
        } catch (error) {
            console.error('Error sending booking details:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!bookingDetails) {
        return <div>No booking details available.</div>;
    }



    return (
        <div className="booking-container">
            <h1>Booking Confirmation</h1>
            <div className="booking-info">
                <p><strong>Booking ID:</strong> {bookingDetails._id}</p>
                <p><strong>Name:</strong> {bookingDetails.name}</p>
                <p><strong>Email:</strong> {bookingDetails.email}</p>
                <p><strong>Time:</strong> {bookingDetails.date + ", " + bookingDetails.time}</p>
                <p><strong>Pick Up:</strong> {bookingDetails.startLocation}</p>
                <p><strong>Destination:</strong> {bookingDetails.destinationLocation}</p>
            </div>
            <p className="thank-you-message">
                We look forward to serving you. If you have any questions, feel free to reach out to us at any time.
            </p>

            {/* Contact Us Section */}
            <div className="contact-us">
                <p>If you need assistance, feel free to <a
                    href="https://wa.me/+447404228217?text=Hello,%20I%20have%20a%20question%20about%20my%20booking."
                    target="_blank" rel="noopener noreferrer">contact us on WhatsApp</a>.</p>
            </div>
        </div>
    );
};

export default BookingResult;
