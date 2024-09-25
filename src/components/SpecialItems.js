import React, { useState } from 'react';
import './SpecialItems.css';

const SpecialItems = ({ onSpecialItemsChange }) => {
    const [specialItems, setSpecialItems] = useState([]); // Initially, no special items
    const [showSpecialItemFields, setShowSpecialItemFields] = useState(false); // Control visibility of input fields

    const handleItemTypeChange = (index, e) => {
        const { value } = e.target;
        const updatedItems = [...specialItems];
        updatedItems[index].type = value;
        setSpecialItems(updatedItems);
        onSpecialItemsChange(updatedItems);
    };

    const handleItemDescriptionChange = (index, e) => {
        const { value } = e.target;
        const updatedItems = [...specialItems];
        updatedItems[index].description = value;
        setSpecialItems(updatedItems);
        onSpecialItemsChange(updatedItems);
    };

    const addSpecialItem = () => {
        setShowSpecialItemFields(true); // Show input fields when the button is clicked
        setSpecialItems([...specialItems, { type: '', description: '' }]); // Add new special item to the list
    };

    const removeSpecialItem = (index) => {
        const updatedItems = specialItems.filter((_, i) => i !== index);
        setSpecialItems(updatedItems);
        onSpecialItemsChange(updatedItems);

        if (updatedItems.length === 0) {
            setShowSpecialItemFields(false); // Hide input fields when all items are removed
        }
    };

    return (
        <div className="special-items">
            {/* Add Special Item Button */}
            {!showSpecialItemFields && (
                <button type="button" className="add-button" onClick={addSpecialItem}>
                    Add Special Item
                </button>
            )}

            {/* Show input fields and the "Add Special Item" button if user clicks the button */}
            {showSpecialItemFields && (
                <>
                    {specialItems.map((item, index) => (
                        <div key={index} className="special-item">
                            <select
                                value={item.type}
                                onChange={(e) => handleItemTypeChange(index, e)}
                            >
                                <option value="">-- Select Item Type --</option>
                                <option value="fragile">Fragile</option>
                                <option value="bulky">Bulky</option>
                                <option value="valuable">Valuable</option>
                                <option value="other">Other (Specify Below)</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Describe the item"
                                value={item.description}
                                onChange={(e) => handleItemDescriptionChange(index, e)}
                            />
                            <button
                                type="button"
                                className="remove-button"
                                onClick={() => removeSpecialItem(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" className="add-button" onClick={addSpecialItem}>
                        Add Another Special Item
                    </button>
                </>
            )}
        </div>
    );
};

export default SpecialItems;
