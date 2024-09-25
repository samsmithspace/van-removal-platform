import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LocationSummary from '../components/LocationSummary';
import QuoteSummary from '../components/QuoteSummary';
import MoveOptions from '../components/MoveOptions';
import '../components/QuotePage.css';


const QuotePage = () => {
    const [moveType, setMoveType] = useState('');
    const [moveDetails, setMoveDetails] = useState({});
    const [confirmDetail, setConfirmDetail] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [displaySummary, setDisplaySummary] = useState(false);
    const [displayoptions,setdisplayoptions]=useState(true);
    //const [bookingid,setbookingid]=useState('');

    const quoteActionsRef = useRef(null); // Create a ref for the QuoteActions component

    const childRef = useRef();
    const [parentVariable, setParentVariable] = useState(0);

    useEffect(() => {
        if (childRef.current) {
            childRef.current.childFunction();
        }
    }, [parentVariable]);


    const handleMoveTypeChange = (selectedMoveType) => {
        setMoveType(selectedMoveType);

    };
    //const handelbookingid = (bookingid)=>{
    //    setbookingid(bookingid)
    //}
    const handleDetailsChange = (details) => {
        setMoveDetails(details);
        setParentVariable((prev) => prev + 1);
    };

    const handleDateChange = (date) => {
        setDate(date);
        setDisplaySummary(true);
        setParentVariable((prev) => prev + 1);
    };

    const handleTimeChange = (time) => {
        setTime(time);
        setParentVariable((prev) => prev + 1);

    };

    const confirmDetailHandler = () => {
        setConfirmDetail(true);
    };

    useEffect(() => {
        if (confirmDetail && quoteActionsRef.current) {
            quoteActionsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [confirmDetail]); // Effect will run when confirmDetail changes

    const location = useLocation();
    const { startLocation, destinationLocation } = location.state || {};

   // const handleFormSubmit = (formData) => {
   //     console.log('Form Submitted:', formData);
        // You can now send the formData to your backend or process it as needed
  //  };

    const hideoptions = () =>{
        setdisplayoptions(false);
    }
    return (
        <div className="quote-page">
            {displayoptions&& (<header className="quote-header">
                <h2>Details</h2>
                <LocationSummary
                    startLocation={startLocation}
                    destinationLocation={destinationLocation}
                />
            </header>)}


            <div>
                {displayoptions&& (
                <div>
                <h1>Items</h1>
                <MoveOptions
                    onMoveTypeChange={handleMoveTypeChange}
                    onDetailsChange={handleDetailsChange}
                    onDateChange={handleDateChange}
                    onTimeChange={handleTimeChange}
                />
                </div>
                )}
                {displaySummary && (
                    <QuoteSummary
                        hideoptions={hideoptions}
                        moveType={moveType}
                        details={moveDetails}
                        date={date}
                        time={time}
                        start={startLocation}
                        dest={destinationLocation}
                        confirmDetail={confirmDetailHandler}
                        ref={childRef}

                    />
                )}
            </div>

            {confirmDetail && (
                <div ref={quoteActionsRef}>

                </div>
            )}

        </div>
    );
};

export default QuotePage;
