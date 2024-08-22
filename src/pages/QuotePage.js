import React, { useState } from 'react';
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
    };

    const confirmDetailHandler = () => {
        setConfirmDetail(true);
    };

    const location = useLocation();
    const { startLocation, destinationLocation } = location.state || {};

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
                    confirmDetail={confirmDetailHandler}
                />
                <QuoteSummary
                    moveType={moveType}
                    details={moveDetails}
                    date={date}
                    time={time}
                />
            </div>

            {confirmDetail && (
                <QuoteActions
                    onConfirm={onConfirm}
                    onBack={onBack}
                />
            )}
        </div>
    );
};

export default QuotePage;
