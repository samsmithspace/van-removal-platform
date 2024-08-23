import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LocationSummary from '../components/LocationSummary';
import QuoteSummary from '../components/QuoteSummary';
import QuoteActions from '../components/QuoteActions';
import MoveOptions from '../components/MoveOptions';
import '../components/QuotePage.css';

const QuotePage = ({ onConfirm, onBack }) => {
    const [moveType, setMoveType] = useState('');
    const [moveDetails, setMoveDetails] = useState({});
    const [confirmDetail, setConfirmDetail] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [displaySummary, setDisplaySummary] = useState(false);

    const quoteActionsRef = useRef(null); // Create a ref for the QuoteActions component

    const handleMoveTypeChange = (selectedMoveType) => {
        setMoveType(selectedMoveType);
    };

    const handleDetailsChange = (details) => {
        setMoveDetails(details);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleTimeChange = (time) => {
        setTime(time);
        setDisplaySummary(true);
    };

    const confirmDetailHandler = () => {
        setConfirmDetail(true);
    };

    useEffect(() => {
        if (confirmDetail && quoteActionsRef.current) {
            quoteActionsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [confirmDetail]); // Effect will run when confirmDetail changes

    const location = useLocation();
    const { startLocation, destinationLocation } = location.state || {};

    const handleFormSubmit = (formData) => {
        console.log('Form Submitted:', formData);
        // You can now send the formData to your backend or process it as needed
    };

    return (
        <div className="quote-page">
            <header className="quote-header">
                <h2>Details</h2>
                <LocationSummary
                    startLocation={startLocation}
                    destinationLocation={destinationLocation}
                />
            </header>

            <div>
                <h1>Items</h1>
                <MoveOptions
                    onMoveTypeChange={handleMoveTypeChange}
                    onDetailsChange={handleDetailsChange}
                    onDateChange={handleDateChange}
                    onTimeChange={handleTimeChange}
                />
                {displaySummary && (
                    <QuoteSummary
                        moveType={moveType}
                        details={moveDetails}
                        date={date}
                        time={time}
                        start={startLocation}
                        dest={destinationLocation}
                        confirmDetail={confirmDetailHandler}
                    />
                )}
            </div>

            {confirmDetail && (
                <div ref={quoteActionsRef}>
                    <QuoteActions onSubmit={handleFormSubmit} />
                </div>
            )}
        </div>
    );
};

export default QuotePage;
