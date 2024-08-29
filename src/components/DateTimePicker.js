import React, { useState } from 'react';
import './DateTimePicker.css';

const DateTimePicker = ({ onDateTimeChange }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        //onDateTimeChange(newDate, time);
    };

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setTime(newTime);
        onDateTimeChange(date, newTime);
    };

    return (
        <div className="date-time-picker">
            <div className="form-group">
                <label htmlFor="date">Select Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="time">Select Time:</label>
                <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={handleTimeChange}
                    required
                />
            </div>
        </div>
    );
};

export default DateTimePicker;
