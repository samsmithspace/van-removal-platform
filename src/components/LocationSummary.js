import './LocationSummary.css';

const LocationSummary = ({ startLocation, destinationLocation }) => {


    return (
        <div className="location-summary">
            <div className="location">
                <h3>From</h3>
                <p>{startLocation}</p>
            </div>

            <div className="location">
                <h3>To</h3>
                <p>{destinationLocation}</p>
            </div>

        </div>
    );
};

export default LocationSummary;
