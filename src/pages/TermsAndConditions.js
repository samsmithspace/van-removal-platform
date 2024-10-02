import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/TermsAndConditions.css'; // Add relevant CSS for styling

const TermsAndConditions = () => {
    const navigate = useNavigate();

    return (
        <div className="terms-and-conditions">
            <h1>Terms and Conditions</h1>

            <h2>1. Accurate Address</h2>
            <p>Customers are responsible for providing an accurate address, including street, house number, and postcode.</p>

            <h2>2. Deposit Policy</h2>
            <p>A 50% deposit is required at the time of booking to confirm the service, along with a valid phone number and email address.</p>
            <p>This deposit will be refunded if the service is cancelled more than 72 hours in advance. All deposits become non-refundable if the booking is cancelled within less than 72 hours from the pick-up date.</p>

            <h2>3. Rescheduling</h2>
            <p>If your plans change, ERemovals will allow you to reschedule the date whenever possible, provided at least 72 hours notice is given.</p>

            <h2>4. Inventory</h2>
            <p>Customers must provide an accurate list of items in advance. Please note that non-listed items may be subject to additional charges on the day.</p>

            <h2>5. Liability for Items</h2>
            <p>ERemovals is not responsible for the contents of parcels in transit but will ensure they are transported safely and securely to their destination.</p>

            <h2>6. Prohibited Items</h2>
            <p>ERemovals will not transport chemicals, flammable or illegal substances, weapons, or items that can, in any way, harm or put at risk the wellbeing of its employees.</p>

            <h2>7. Behavior Towards Employees</h2>
            <p>ERemovals will not tolerate harassment or abuse from any customer to its employees and will report such actions to the local authorities if necessary.</p>

            {/* Back to Main Page Button */}
            <button className="back-button" onClick={() => navigate('/')}>
                Back to Main Page
            </button>
        </div>
    );
};

export default TermsAndConditions;
