import React from 'react';
import './QuoteActions.css';

const QuoteActions = ({ onConfirm, onBack }) => {
    return (
        <footer className="quote-actions">
            <button className="btn-confirm" onClick={onConfirm}>Confirm Quote</button>
            <button className="btn-back" onClick={onBack}>Go Back</button>
        </footer>
    );
};

export default QuoteActions;
