import React, { useState } from 'react';
import './SpecialItems.css';

const SpecialItems = ({ onSpecialItemsChange }) => {
    const [specialItems, setSpecialItems] = useState([{ type: '', description: '' }]);

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
        setSpecialItems([...specialItems, { type: '', description: '' }]);
    };

    const removeSpecialItem = (index) => {
        const updatedItems = specialItems.filter((_, i) => i !== index);
        setSpecialItems(updatedItems);
        onSpecialItemsChange(updatedItems);
    };

    return (
        <div className="special-items">
            <h4>Special Items</h4>
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
                    {specialItems.length > 1 && (
                        <button type="button" onClick={() => removeSpecialItem(index)}>
                            Remove
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={addSpecialItem}>
                Add Another Special Item
            </button>
        </div>
    );
};

export default SpecialItems;
