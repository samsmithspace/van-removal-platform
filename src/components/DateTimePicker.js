import React, { useState } from 'react';
import './DateTimePicker.css';

const DateTimePicker = ({ onDateChange,onTimeChange }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        onDateChange(newDate);
    };

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setTime(newTime);
        onTimeChange(newTime);
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
