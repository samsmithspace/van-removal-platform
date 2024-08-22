import React from 'react';
import './QuoteSummary.css';

const QuoteSummary = ({ moveType, details, date, time }) => {
    return (
        <section className="quote-summary">
            <h3>Summary</h3>
            <div className="quote-details-container">
                <div className="quote-details">
                    <p>Move Type: {moveType === 'student' ? 'Student Move' : 'House Move'}</p>
                    {moveType === 'student' && details.boxDetails && (
                        <div>
                            <h4>Item Details:</h4>
                            {details.boxDetails.map((boxDetail, index) => (
                                <p key={index}>
                                    {boxDetail.numberOfBoxes} {boxDetail.boxSize} box{boxDetail.numberOfBoxes !== 1 ? 'es' : ''}
                                </p>
                            ))}
                            <p>Lift Available: {details.liftAvailable ? 'Yes' : 'No'}</p>
                        </div>
                    )}

                    {details.specialItems && details.specialItems.length > 0 && (
                        <div>
                            <h4>Special Items:</h4>
                            {details.specialItems.map((item, index) => (
                                <p key={index}>
                                    {item.type}: {item.description}
                                </p>
                            ))}
                        </div>
                    )}

                    <div>
                        <h4>Moving Date & Time:</h4>
                        <p>Date: {date}</p>
                        <p>Time: {time}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuoteSummary;
