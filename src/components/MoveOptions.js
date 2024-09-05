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
        { boxSize: 'Extra large', numberOfBoxes: 0 }
    ]);
    const [liftAvailable, setLiftAvailable] = useState(false);
    const [liftAvailabledest, setLiftAvailableright] = useState(false);
    const [numberofstairsright, setNumberofstairsright] = useState(0);
    const [numberOfStairs, setNumberOfStairs] = useState(0);
    const [specialItems, setSpecialItems] = useState([]);

    const handleDateChange = (date) => {
        onDateChange(date);
    };

    const handleTimeChange = (time) => {
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
        onDetailsChange({ boxDetails: newBoxDetails, liftAvailable, numberOfStairs, specialItems, liftAvailabledest, numberofstairsright });
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
        //setNumberOfStairs(''); // Reset stairs if lift becomes available
        onDetailsChange({ boxDetails, liftAvailable: isLiftAvailable, numberOfStairs, specialItems, liftAvailabledest, numberofstairsright });
    };

    const handleLiftAvailabilityrightChange = (e) => {
        const isLiftAvailabler = e.target.checked;
        setLiftAvailableright(isLiftAvailabler);
        //setNumberOfStairs(''); // Reset stairs if lift becomes available
        onDetailsChange({ boxDetails, liftAvailable, numberOfStairs, specialItems, liftAvailabledest: isLiftAvailabler, numberofstairsright });
    };

    const handleNumberOfStairsChange = (e) => {
        const value = e.target.value;
        const stairs = value === '' ? '' : parseInt(value, 10); // Allow empty string for deletable state
        setNumberOfStairs(stairs);
        onDetailsChange({ boxDetails, liftAvailable, numberOfStairs: stairs, specialItems, liftAvailabledest, numberofstairsright });
    };

    const handleNumberOfStairsChangeright = (e) => {
        const value = e.target.value;
        const stairsdest = value === '' ? '' : parseInt(value, 10); // Allow empty string for deletable state
        setNumberofstairsright(stairsdest);
        onDetailsChange({ boxDetails, liftAvailable, numberOfStairs, specialItems, liftAvailabledest, numberofstairsright: stairsdest });
    };

    const handleSpecialItemsChange = (items) => {
        setSpecialItems(items);
        onDetailsChange({ boxDetails, liftAvailable, numberOfStairs, specialItems: items, liftAvailabledest, numberofstairsright });
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

                    {/* Grouped elements for lift availability and stairs inputs */}
                    <div className="lift-stairs-group">
                        <div className="lift-option">
                            <label>
                                Lift Available at start?
                                <input
                                    type="checkbox"
                                    name="liftAvailable"
                                    checked={liftAvailable}
                                    onChange={handleLiftAvailabilityChange}
                                />
                            </label>
                        </div>
                        <div className="stairs-input">
                            <label>
                                Number of Stairs at start:
                                <input
                                    type="number"
                                    name="numberOfStairs"
                                    value={numberOfStairs === 0 ? 0 : numberOfStairs}
                                    onChange={handleNumberOfStairsChange}
                                    min="0"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Grouped elements for lift availability and stairs inputs at destination */}
                    <div className="lift-stairs-group">
                        <div className="lift-option">
                            <label>
                                Lift Available at destination?
                                <input
                                    type="checkbox"
                                    name="liftAvailable"
                                    checked={liftAvailabledest}
                                    onChange={handleLiftAvailabilityrightChange}
                                />
                            </label>
                        </div>
                        <div className="stairs-input">
                            <label>
                                Number of Stairs at destination:
                                <input
                                    type="number"
                                    name="numberOfStairsr"
                                    value={numberofstairsright === 0 ? 0 : numberofstairsright}
                                    onChange={handleNumberOfStairsChangeright}
                                    min="0"
                                />
                            </label>
                        </div>
                    </div>

                    <SpecialItems onSpecialItemsChange={handleSpecialItemsChange} />

                    <DateTimePicker onDateChange={handleDateChange} onTimeChange={handleTimeChange} />
                </div>
            )}
        </div>
    );
};

export default MoveOptions;
