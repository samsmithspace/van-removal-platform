import React, { useState } from 'react';
import './MoveOptions.css';
import SpecialItems from './SpecialItems';
import DateTimePicker from './DateTimePicker';

const MoveOptions = ({ onMoveTypeChange, onDetailsChange, onDateChange, onTimeChange }) => {
    const [moveType, setMoveType] = useState(''); // State to store the selected move type
    const [boxDetails, setBoxDetails] = useState([
        { boxSize: 'small', numberOfBoxes: 0 },
        { boxSize: 'medium', numberOfBoxes: 0 },
        { boxSize: 'large (or heavier than 20 kg)', numberOfBoxes: 0 },
    ]);
    const [liftAvailable, setLiftAvailable] = useState(false);
    const [specialItems, setSpecialItems] = useState([]);

    const handleDateTimeChange = (date, time) => {
        onDateChange(date);
        onTimeChange(time);
    };

    const handleMoveTypeChange = (e) => {
        const selectedMoveType = e.target.value;
        setMoveType(selectedMoveType);
        onMoveTypeChange(selectedMoveType);
    };

    const handleBoxDetailsChange = (index, e) => {
        const { name, value } = e.target;
        const newBoxDetails = [...boxDetails];
        newBoxDetails[index][name] = parseInt(value, 10);
        setBoxDetails(newBoxDetails);
        onDetailsChange({ boxDetails: newBoxDetails, liftAvailable, specialItems });
    };

    const handleLiftAvailabilityChange = (e) => {
        const isLiftAvailable = e.target.checked;
        setLiftAvailable(isLiftAvailable);
        onDetailsChange({ boxDetails, liftAvailable: isLiftAvailable, specialItems });
    };

    const handleSpecialItemsChange = (items) => {
        setSpecialItems(items);
        onDetailsChange({ boxDetails, liftAvailable, specialItems: items });
    };

    return (
        <div className="move-options">
            <h3>Select Move Type</h3>
            <select value={moveType} onChange={handleMoveTypeChange}>
                <option value="">-- Select Move Type --</option>
                <option value="student">Student Move</option>
                <option value="house">House Move</option>
            </select>

            {moveType === 'student' && (
                <div className="student-options">
                    {boxDetails.map((boxDetail, index) => (
                        <div key={index} className="box-detail">
                            <p></p>
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

                    <SpecialItems onSpecialItemsChange={handleSpecialItemsChange} />
                    <DateTimePicker onDateTimeChange={handleDateTimeChange} />
                </div>
            )}
        </div>
    );
};

export default MoveOptions;
