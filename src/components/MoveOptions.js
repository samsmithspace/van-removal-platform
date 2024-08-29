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
    const [numberOfStairs, setNumberOfStairs] = useState('');
    const [specialItems, setSpecialItems] = useState([]);

    const handleDateTimeChange = (date, time) => {
        onDateChange(date);
        onTimeChange(time);
    };

    const handleMoveTypeChange = (type) => {
        setMoveType(type);
        onMoveTypeChange(type);
    };

    const handleBoxDetailsChange = (index, value) => {
        const newBoxDetails = [...boxDetails];
        newBoxDetails[index].numberOfBoxes = value;
        setBoxDetails(newBoxDetails);
        onDetailsChange({ boxDetails: newBoxDetails, liftAvailable, numberOfStairs, specialItems });
    };

    const incrementBoxCount = (index) => {
        handleBoxDetailsChange(index, boxDetails[index].numberOfBoxes + 1);
    };

    const decrementBoxCount = (index) => {
        if (boxDetails[index].numberOfBoxes > 0) {
            handleBoxDetailsChange(index, boxDetails[index].numberOfBoxes - 1);
        }
    };

    const handleLiftAvailabilityChange = (e) => {
        const isLiftAvailable = e.target.checked;
        setLiftAvailable(isLiftAvailable);
        setNumberOfStairs(''); // Reset stairs if lift becomes available
        onDetailsChange({ boxDetails, liftAvailable: isLiftAvailable, numberOfStairs, specialItems });
    };

    const handleNumberOfStairsChange = (e) => {
        const value = e.target.value;
        const stairs = value === '' ? '' : parseInt(value, 10); // Allow empty string for deletable state
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
                                <div className="input-group">
                                    <input
                                        className="numberinput"
                                        type="number"
                                        name="numberOfBoxes"
                                        value={boxDetail.numberOfBoxes === 0 ? '' : boxDetail.numberOfBoxes}
                                        onChange={(e) => handleBoxDetailsChange(index, e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                                        min="0"
                                    />
                                    <button
                                        type="button"
                                        className="increment-button"
                                        onClick={() => incrementBoxCount(index)}
                                    >
                                        +
                                    </button>
                                    <button
                                        type="button"
                                        className="decrement-button"
                                        onClick={() => decrementBoxCount(index)}
                                    >
                                        -
                                    </button>
                                </div>
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
                                <div className="input-group">
                                    <input
                                        type="number"
                                        name="numberOfStairs"
                                        value={numberOfStairs === 0 ? '' : numberOfStairs}
                                        onChange={handleNumberOfStairsChange}
                                        min="0"
                                    />
                                </div>
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
