import React, { useState } from 'react';
import './MoveOptions.css';
import SpecialItems from './SpecialItems';
import DateTimePicker from './DateTimePicker';

const MoveOptions = ({ onMoveTypeChange, onDetailsChange, onDateChange, onTimeChange }) => {
    const [moveType, setMoveType] = useState('');
    const [boxDetails, setBoxDetails] = useState([
        { boxSize: 'small', numberOfBoxes: 0 },
        { boxSize: 'medium', numberOfBoxes: 0 },
        { boxSize: 'large (or heavier than 20 kg)', numberOfBoxes: 0 },
    ]);
    const [liftAvailable, setLiftAvailable] = useState(false);
    const [numberOfStairs, setNumberOfStairs] = useState(0);
    const [specialItems, setSpecialItems] = useState([]);

    const handleDateTimeChange = (date, time) => {
        onDateChange(date);
        onTimeChange(time);
    };

    const handleMoveTypeChange = (type) => {
        setMoveType(type);
        onMoveTypeChange(type);
    };

    const handleBoxDetailsChange = (index, e) => {
        const { name, value } = e.target;
        const newBoxDetails = [...boxDetails];
        newBoxDetails[index][name] = parseInt(value, 10);
        setBoxDetails(newBoxDetails);
        onDetailsChange({ boxDetails: newBoxDetails, liftAvailable, numberOfStairs, specialItems });
    };

    const handleLiftAvailabilityChange = (e) => {
        const isLiftAvailable = e.target.checked;
        setLiftAvailable(isLiftAvailable);
        setNumberOfStairs(0); // Reset stairs if lift becomes available
        onDetailsChange({ boxDetails, liftAvailable: isLiftAvailable, numberOfStairs, specialItems });
    };

    const handleNumberOfStairsChange = (e) => {
        const stairs = parseInt(e.target.value, 10);
        setNumberOfStairs(stairs);
        onDetailsChange({ boxDetails, liftAvailable, numberOfStairs: stairs, specialItems });
    };

    const handleSpecialItemsChange = (items) => {
        setSpecialItems(items);
        onDetailsChange({ boxDetails, liftAvailable, numberOfStairs, specialItems: items });
    };

    return (
        <div className="move-options">
            <h3>Select Move Type</h3>
            <div className="button-group">
                <button
                    className={`move-type-button ${moveType === 'student' ? 'active' : ''}`}
                    onClick={() => handleMoveTypeChange('student')}
                >
                    Student Move
                </button>
                <button
                    className={`move-type-button ${moveType === 'house' ? 'active' : ''}`}
                    onClick={() => handleMoveTypeChange('house')}
                >
                    House Move
                </button>
            </div>
            <p></p>

            {moveType === 'student' && (
                <div className="student-options">
                    {boxDetails.map((boxDetail, index) => (
                        <div key={index} className="box-detail">
                            <label>
                                {boxDetail.boxSize.charAt(0).toUpperCase() + boxDetail.boxSize.slice(1)}:
                                <input
                                    type="number"
                                    name="numberOfBoxes"
                                    value={boxDetail.numberOfBoxes}
                                    onChange={(e) => handleBoxDetailsChange(index, e)}
                                    min="0"
                                />
                            </label>
                        </div>
                    ))}
                    <label>
                        Lift Available:
                        <input
                            type="checkbox"
                            name="liftAvailable"
                            checked={liftAvailable}
                            onChange={handleLiftAvailabilityChange}
                        />
                    </label>

                    {!liftAvailable && (
                        <div className="stairs-input">
                            <label>
                                Number of Stairs:
                                <input
                                    type="number"
                                    name="numberOfStairs"
                                    value={numberOfStairs}
                                    onChange={handleNumberOfStairsChange}
                                    min="0"
                                />
                            </label>
                        </div>
                    )}

                    <SpecialItems onSpecialItemsChange={handleSpecialItemsChange} />
                    <DateTimePicker onDateTimeChange={handleDateTimeChange} />
                </div>
            )}
        </div>
    );
};

export default MoveOptions;
