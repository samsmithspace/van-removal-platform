import { useEffect } from 'react';
import '../components/PaymentCancellation.css';

const PaymentCancellation = () => {
    useEffect(() => {
        // Prevent the user from using the back button to go to the previous page
        window.history.pushState(null, '', window.location.href);
        const handlePopState = () => {
            window.history.pushState(null, '', window.location.href);
        };
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (
        <div className="cancellation-container">
            <h1>Payment Cancellation</h1>
            <p className="apology-message">
                Your payment has been canceled.
                </p>
            <p></p>
            <p>
                We have emailed you with further instructions. If you wish to continue placing your order or amend it, please use the link provided in the email.
                If you have any questions, feel free to reach out to our support team.
            </p>

            {/* Contact Us Section */}
            <div className="contact-us">
                <p>If you need assistance, feel free to <a
                    href="https://wa.me/+447404228217?text=Hello,%20I%20have%20a%20question%20about%20my%20payment%20cancellation."
                    target="_blank" rel="noopener noreferrer">contact us on WhatsApp</a>.</p>
            </div>
        </div>
    );
};

export default PaymentCancellation;
