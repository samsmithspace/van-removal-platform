import React, { useEffect, useState } from 'react';
import './MoveOptions.css';
import SpecialItems from './SpecialItems';
import DateTimePicker from './DateTimePicker';
import { useTranslation } from 'react-i18next';
const MoveOptions = ({ onMoveTypeChange, onDetailsChange, onDateChange, onTimeChange, MT }) => {
    const { t } = useTranslation(); // 初始化翻译钩子
    const [boxDetails, setBoxDetails] = useState([
        { boxSize: 'small', numberOfBoxes: 0 },
        { boxSize: 'medium', numberOfBoxes: 0 },
        { boxSize: 'large (or heavier than 20 kg)', numberOfBoxes: 0 },
        { boxSize: 'Extra large', numberOfBoxes: 0 }
    ]);

    // State variables for fetched data
    const [furnitureOptions, setFurnitureOptions] = useState([]);
    const [applianceOptions, setApplianceOptions] = useState([]);

    // Other state variables
    const [liftAvailable, setLiftAvailable] = useState(false);
    const [liftAvailabledest, setLiftAvailableright] = useState(false);
    const [numberofstairsright, setNumberofstairsright] = useState(0);
    const [numberOfStairs, setNumberOfStairs] = useState(0);
    const [specialItems, setSpecialItems] = useState([]);
    const [furnitureDetails, setFurnitureDetails] = useState([]);
    const [applianceDetails, setApplianceDetails] = useState([]);
    const [moveType, setMoveType] = useState(MT.locationType); // Initialize moveType with MT.locationType

    useEffect(() => {
        console.log('getting items');
        fetch(`${process.env.REACT_APP_API_URL}/api/price-item/api/price-item`)
            .then(response => response.json())
            .then(data => {
                // Adjusted to use 'itemName' and match the category values
                const furniture = data
                    .filter(item => item.category === 'Furniture') // Adjust category to 'Furniture'
                    .map(item => item.itemName); // Use 'itemName' instead of 'name'
                const appliances = data
                    .filter(item => item.category === 'Appliances')
                    .map(item => item.itemName);
                setFurnitureOptions(furniture);
                setApplianceOptions(appliances);
            })
            .catch(error => console.error('Error fetching price items:', error));
    }, []);

    // Update moveType whenever MT changes
    useEffect(() => {
        setMoveType(MT.locationType);
    }, [MT]);

    // Handler functions
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
            {moveType === 'student' && (
                <div className="student-options">
                    <h3>{t('Box')}:</h3>
                    <div className="boxoption">
                        {boxDetails.map((boxDetail, index) => (
                            <div key={index} className="box-detail">
                                <label>
                                    {t(boxDetail.boxSize.charAt(0).toUpperCase() + boxDetail.boxSize.slice(1))}:
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
                        <h3>{t('Furniture')}:</h3>
                        <div className="furniture-input">
                            {furnitureDetails.map((furniture, index) => (
                                <div key={index} className="furniture-detail">
                                    <select
                                        value={furniture.item}
                                        onChange={(e) => handleFurnitureChange(e, index)}
                                    >
                                        <option value="">{t('Select Furniture')}</option>
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
                                    <button type="button" className="deletebutton"
                                            onClick={() => deleteFurniture(index)}>
                                        {t('Delete')}
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="housebutt" onClick={addFurniture}>
                                {t('Add Furniture')}
                            </button>
                        </div>
                        <h3>{t('Appliances')}:</h3>

                        <div className="furniture-input">
                            {applianceDetails.map((appliance, index) => (
                                <div key={index} className="appliance-detail">
                                    <select
                                        value={appliance.item}
                                        onChange={(e) => handleApplianceChange(e, index)}
                                    >
                                        <option value="">{t('Select Appliance')}</option>
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
                                    <button type="button" className="deletebutton"
                                            onClick={() => deleteAppliance(index)}>
                                        {t('Delete')}
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="housebutt" onClick={addAppliance}>
                                {t('Add Appliance')}
                            </button>
                        </div>
                    </div>
                    <h3>{t('Special Items')}:</h3>
                    <SpecialItems onSpecialItemsChange={handleSpecialItemsChange}/>

                    <h3>{t('Floors')}:</h3>

                    <div className="lift-stairs-group">
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={liftAvailable}
                                onChange={handleLiftAvailabilityChange}
                                className="checkbox-input"
                            />
                            {t('Lift Available at Move Out Location')}
                        </label>


                        <div className="stairs-input">
                            <label>
                                {t('Floors at start')}
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
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={liftAvailabledest}
                                onChange={handleLiftAvailabilityrightChange}
                                className="checkbox-input"
                            />
                            {t('Lift Available at Move In Location')}
                        </label>

                        <div className="stairs-input">
                            <label>
                                {t('Floors at destination')}
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
                    <h3>{t('Select Date and Time')}:</h3>
                    <DateTimePicker onDateChange={handleDateChange} onTimeChange={handleTimeChange}/>
                </div>
            )}
            {moveType === 'house' && (
                <div className="house-options">
                    <h3>{t('Box')}:</h3>
                    <div className="boxoption">
                        {boxDetails.map((boxDetail, index) => (
                            <div key={index} className="box-detail">
                                <label>
                                    {t(boxDetail.boxSize.charAt(0).toUpperCase() + boxDetail.boxSize.slice(1))}:
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
                        <h3>{t('Furniture')}:</h3>
                        <div className="furniture-input">
                            {furnitureDetails.map((furniture, index) => (
                                <div key={index} className="furniture-detail">
                                    <select
                                        value={furniture.item}
                                        onChange={(e) => handleFurnitureChange(e, index)}
                                    >
                                        <option value="">{t('Select Furniture')}</option>
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
                                    <button type="button" className="deletebutton"
                                            onClick={() => deleteFurniture(index)}>
                                        {t('Delete')}
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="housebutt" onClick={addFurniture}>
                                {t('Add Furniture')}
                            </button>
                        </div>
                        <h3>{t('Appliances')}:</h3>

                        <div className="furniture-input">
                            {applianceDetails.map((appliance, index) => (
                                <div key={index} className="appliance-detail">
                                    <select
                                        value={appliance.item}
                                        onChange={(e) => handleApplianceChange(e, index)}
                                    >
                                        <option value="">{t('Select Appliance')}</option>
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
                                        {t('Delete')}
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="housebutt" onClick={addAppliance}>
                                {t('Add Appliance')}
                            </button>
                        </div>
                    </div>
                    <h3>{t('Special Items')}:</h3>
                    <SpecialItems onSpecialItemsChange={handleSpecialItemsChange} />
                    <h3>{t('Floors')}:</h3>
                    <div className="lift-stairs-group">
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={liftAvailable}
                                onChange={handleLiftAvailabilityChange}
                            />
                            <span className="slider"></span>
                            {t('Lift Available at Move Out Location')}
                        </label>

                        <div className="stairs-input">
                            <label>
                                {t('Floors at move out')}:
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
                            {t('Lift Available at Move In Location')}
                        </button>
                        <div className="stairs-input">
                            <label>
                                {t('Floors at move in')}:
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
                    <h3>{t('Select Date and Time')}:</h3>

                    <DateTimePicker onDateChange={handleDateChange} onTimeChange={handleTimeChange} />
                </div>
            )}
        </div>
    );
};

export default MoveOptions;