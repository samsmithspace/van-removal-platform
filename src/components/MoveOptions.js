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
    const [furnitureDetails, setFurnitureDetails] = useState([]);
    const [applianceDetails, setApplianceDetails] = useState([]);

    const furnitureOptions = [
        'Sofa (2-Seater)',
        'Sofa (3-Seater)',
        'Sofa (L-Shaped)',
        'Armchair',
        'Dining Table',
        'Single Bed',
        'Double Bed',
        'Queen Bed',
        'King Bed',
        'Bunk Bed',
        'Wardrobe (Single Door)',
        'Wardrobe (Double Door)',
        'Wardrobe (Sliding Door)',
        'Bookcase (Small)',
        'Bookcase (Large)',
        'Desk',
        'Nightstand',
        'Cabinet',
        'Ottoman',
        'TV Stand',
        'Office Chair',
        'Dining Chair',
        'Mirror (Large)',
        'Mirror (Small)',
        'Rug (Large)',
        'Rug (Small)',
        'Exercise Equipment',
        'Piano',
        'Bicycle',
        'Motorcycle',
        'Ladder',
    ];

    const applianceOptions = [
        'Refrigerator (Mini)',
        'Refrigerator (Standard)',
        'Refrigerator (French Door)',
        'Washing Machine',
        'Microwave',
        'Oven',
        'Dishwasher',
        'Stove',
        'Television (Under 32")',
        'Television (32"-50")',
        'Television (Over 50")',
        'Stereo System',
        'Monitor',
        'Lawn Mower',
        'Hot Tub',
        'Water Heater',
        'Air Purifier'
    ];


    const handleFurnitureChange = (e, index) => {
        const newFurnitureDetails = [...furnitureDetails];
        newFurnitureDetails[index] = { ...newFurnitureDetails[index], item: e.target.value };
        setFurnitureDetails(newFurnitureDetails);
        onDetailsChange({
            boxDetails,
            liftAvailable,
            numberOfStairs,
            specialItems,
            liftAvailabledest,
            numberofstairsright,
            furnitureDetails: newFurnitureDetails,
            applianceDetails
        });
    };

    const handleFurnitureQuantityChange = (index, value) => {
        const newFurnitureDetails = [...furnitureDetails];
        newFurnitureDetails[index] = { ...newFurnitureDetails[index], quantity: value };
        setFurnitureDetails(newFurnitureDetails);
        onDetailsChange({
            boxDetails,
            liftAvailable,
            numberOfStairs,
            specialItems,
            liftAvailabledest,
            numberofstairsright,
            furnitureDetails: newFurnitureDetails,
            applianceDetails
        });
    };

    const handleApplianceChange = (e, index) => {
        const newApplianceDetails = [...applianceDetails];
        newApplianceDetails[index] = { ...newApplianceDetails[index], item: e.target.value };
        setApplianceDetails(newApplianceDetails);
        onDetailsChange({
            boxDetails,
            liftAvailable,
            numberOfStairs,
            specialItems,
            liftAvailabledest,
            numberofstairsright,
            furnitureDetails,
            applianceDetails: newApplianceDetails
        });
    };

    const handleApplianceQuantityChange = (index, value) => {
        const newApplianceDetails = [...applianceDetails];
        newApplianceDetails[index] = { ...newApplianceDetails[index], quantity: value };
        setApplianceDetails(newApplianceDetails);
        onDetailsChange({
            boxDetails,
            liftAvailable,
            numberOfStairs,
            specialItems,
            liftAvailabledest,
            numberofstairsright,
            furnitureDetails,
            applianceDetails: newApplianceDetails
        });
    };

    const addFurniture = () => {
        setFurnitureDetails([...furnitureDetails, { item: '', quantity: 1 }]);
    };

    const addAppliance = () => {
        setApplianceDetails([...applianceDetails, { item: '', quantity: 1 }]);
    };

    // Delete handler for furniture
    const deleteFurniture = (index) => {
        const newFurnitureDetails = [...furnitureDetails];
        newFurnitureDetails.splice(index, 1);
        setFurnitureDetails(newFurnitureDetails);
        onDetailsChange({
            boxDetails,
            liftAvailable,
            numberOfStairs,
            specialItems,
            liftAvailabledest,
            numberofstairsright,
            furnitureDetails: newFurnitureDetails,
            applianceDetails
        });
    };

    // Delete handler for appliances
    const deleteAppliance = (index) => {
        const newApplianceDetails = [...applianceDetails];
        newApplianceDetails.splice(index, 1);
        setApplianceDetails(newApplianceDetails);
        onDetailsChange({
            boxDetails,
            liftAvailable,
            numberOfStairs,
            specialItems,
            liftAvailabledest,
            numberofstairsright,
            furnitureDetails,
            applianceDetails: newApplianceDetails
        });
    };

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
        onDetailsChange({
            boxDetails: newBoxDetails,
            liftAvailable,
            numberOfStairs,
            specialItems,
            liftAvailabledest,
            numberofstairsright,
            furnitureDetails,
            applianceDetails
        });
    };

    const incrementBoxCount = (index) => {
        handleBoxDetailsChange(index, boxDetails[index].numberOfBoxes + 1);
    };

    const decrementBoxCount = (index) => {
        if (boxDetails[index].numberOfBoxes > 0) {
            handleBoxDetailsChange(index, boxDetails[index].numberOfBoxes - 1);
        }
    };

    const handleLiftAvailabilityChange = () => {
        const newLiftAvailable = !liftAvailable;
        setLiftAvailable(newLiftAvailable);
        onDetailsChange({
            boxDetails,
            liftAvailable: newLiftAvailable,
            numberOfStairs,
            specialItems,
            liftAvailabledest,
            numberofstairsright,
            furnitureDetails,
            applianceDetails
        });
    };

    const handleLiftAvailabilityrightChange = () => {
        const newLiftAvailableDest = !liftAvailabledest;
        setLiftAvailableright(newLiftAvailableDest);
        onDetailsChange({
            boxDetails,
            liftAvailable,
            numberOfStairs,
            specialItems,
            liftAvailabledest: newLiftAvailableDest,
            numberofstairsright,
            furnitureDetails,
            applianceDetails
        });
    };

    const handleNumberOfStairsChange = (e) => {
        const value = e.target.value;
        const stairs = value === '' ? '' : parseInt(value, 10);
        setNumberOfStairs(stairs);
        onDetailsChange({
            boxDetails,
            liftAvailable,
            numberOfStairs: stairs,
            specialItems,
            liftAvailabledest,
            numberofstairsright,
            furnitureDetails,
            applianceDetails
        });
    };

    const handleNumberOfStairsChangeright = (e) => {
        const value = e.target.value;
        const stairsdest = value === '' ? '' : parseInt(value, 10);
        setNumberofstairsright(stairsdest);
        onDetailsChange({
            boxDetails,
            liftAvailable,
            numberOfStairs,
            specialItems,
            liftAvailabledest,
            numberofstairsright: stairsdest,
            furnitureDetails,
            applianceDetails
        });
    };

    const handleSpecialItemsChange = (items) => {
        setSpecialItems(items);
        onDetailsChange({
            boxDetails,
            liftAvailable,
            numberOfStairs,
            specialItems: items,
            liftAvailabledest,
            numberofstairsright,
            furnitureDetails,
            applianceDetails
        });
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
                    <h3>Box:</h3>
                    <div className="boxoption">
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
                                            onChange={(e) =>
                                                handleBoxDetailsChange(
                                                    index,
                                                    e.target.value === '' ? '' : parseInt(e.target.value, 10)
                                                )
                                            }
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
                    </div>
                    <h3>Special Items:</h3>
                    <SpecialItems onSpecialItemsChange={handleSpecialItemsChange} />

                    <h3>Floors:</h3>

                    <div className="lift-stairs-group">
                        <button
                            className={`lift-button ${liftAvailable ? 'active' : ''}`}
                            onClick={handleLiftAvailabilityChange}
                        >
                            Lift Available at Move Out Location
                        </button>
                        <div className="stairs-input">
                            <label>
                                Floors at start:
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
                    <div className="lift-stairs-group">
                        <button
                            className={`lift-button ${liftAvailabledest ? 'active' : ''}`}
                            onClick={handleLiftAvailabilityrightChange}
                        >
                            Lift Available at Move In Location
                        </button>
                        <div className="stairs-input">
                            <label>
                                Floors at destination:
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
                    <h3>Select Date and Time:</h3>
                    <DateTimePicker onDateChange={handleDateChange} onTimeChange={handleTimeChange} />
                </div>
            )}
            {moveType === 'house' && (
                <div className="student-options">
                    <h3>Box:</h3>
                    <div className="boxoption">
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
                                            onChange={(e) =>
                                                handleBoxDetailsChange(
                                                    index,
                                                    e.target.value === '' ? '' : parseInt(e.target.value, 10)
                                                )
                                            }
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
                    </div>

                    <div>
                        <h3>Furniture:</h3>
                        <div className="furniture-input">
                            {furnitureDetails.map((furniture, index) => (
                                <div key={index} className="furniture-detail">
                                    <select
                                        value={furniture.item}
                                        onChange={(e) => handleFurnitureChange(e, index)}
                                    >
                                        <option value="">Select Furniture</option>
                                        {furnitureOptions.map((option, i) => (
                                            <option key={i} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        value={furniture.quantity}
                                        min="1"
                                        onChange={(e) =>
                                            handleFurnitureQuantityChange(
                                                index,
                                                parseInt(e.target.value, 10)
                                            )
                                        }
                                    />
                                    <button type="button" className="deletebutton" onClick={() => deleteFurniture(index)}>
                                        Delete
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="housebutt" onClick={addFurniture}>
                                Add Furniture
                            </button>
                        </div>
                        <h3>Appliances:</h3>

                        <div className="furniture-input">
                            {applianceDetails.map((appliance, index) => (
                                <div key={index} className="appliance-detail">
                                    <select
                                        value={appliance.item}
                                        onChange={(e) => handleApplianceChange(e, index)}
                                    >
                                        <option value="">Select Appliance</option>
                                        {applianceOptions.map((option, i) => (
                                            <option key={i} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        value={appliance.quantity}
                                        min="1"
                                        onChange={(e) =>
                                            handleApplianceQuantityChange(
                                                index,
                                                parseInt(e.target.value, 10)
                                            )
                                        }
                                    />
                                    <button type="button" className="deletebutton" onClick={() => deleteAppliance(index)}>
                                        Delete
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="housebutt" onClick={addAppliance}>
                                Add Appliance
                            </button>
                        </div>
                    </div>
                    <h3>Special Items:</h3>
                    <SpecialItems onSpecialItemsChange={handleSpecialItemsChange} />
                    <h3>Floors:</h3>
                    <div className="lift-stairs-group">
                        <button
                            className={`lift-button ${liftAvailable ? 'active' : ''}`}
                            onClick={handleLiftAvailabilityChange}
                        >
                            Lift Available at Move Out Location
                        </button>
                        <div className="stairs-input">
                            <label>
                                Floors at move out:
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

                    <div className="lift-stairs-group">
                        <button
                            className={`lift-button ${liftAvailabledest ? 'active' : ''}`}
                            onClick={handleLiftAvailabilityrightChange}
                        >
                            Lift Available at Move In Location
                        </button>
                        <div className="stairs-input">
                            <label>
                                Floors at move in:
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
                    <h3>Select Date and Time:</h3>

                    <DateTimePicker onDateChange={handleDateChange} onTimeChange={handleTimeChange} />
                </div>
            )}
        </div>
    );
};

export default MoveOptions;
