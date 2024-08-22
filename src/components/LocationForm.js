import React, { useState } from 'react';

function LocationForm({ onQuoteGenerated }) {
    const [startLocation, setStartLocation] = useState('');
    const [destinationLocation, setDestinationLocation] = useState('');
    const [floors, setFloors] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple quote calculation
        const quote = floors * 50; // Example calculation
        onQuoteGenerated(quote);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Start Location"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
            />
            <input
                type="text"
                placeholder="Destination Location"
                value={destinationLocation}
                onChange={(e) => setDestinationLocation(e.target.value)}
            />
            <input
                type="number"
                placeholder="Number of Floors"
                value={floors}
                onChange={(e) => setFloors(e.target.value)}
            />
            <button type="submit">Get Quote</button>
        </form>
    );
}

export default LocationForm;
