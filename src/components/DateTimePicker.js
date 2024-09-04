import React, { useState } from 'react';
import './DateTimePicker.css';
import DateTime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

const DateTimePicker = ({ onDateChange, onTimeChange }) => {
    const [date, setDate] = useState(null);
    const timeRange = ['08:00', '17:00']; // Define the selectable time range as [start, end]
    const [time, setTime] = useState(moment(timeRange[0], 'HH:mm')); // Set default time to lower end of timeRange

    const unavailableDates = ['2024-09-04', '2024-09-05', '2024-10-21', '2024-10-22'];

    const handleDateChange = (newDate) => {
        if (moment(newDate).isValid()) {
            setDate(newDate);
            onDateChange(newDate.format('YYYY-MM-DD'));
        }
    };

    const handleTimeChange = (newTime) => {
        if (moment(newTime).isValid() && isTimeInRange(newTime)) {
            setTime(newTime);
            onTimeChange(newTime.format('HH:mm'));
        }
    };

    const isDateUnavailable = (currentDate) => {
        return unavailableDates.includes(moment(currentDate).format('YYYY-MM-DD'));
    };

    const isTimeInRange = (currentTime) => {
        const [start, end] = timeRange.map(t => moment(t, 'HH:mm'));
        return currentTime.isBetween(start, end, 'minute', '[]'); // Checks if the time is within the range (inclusive)
    };

    return (
        <div className="date-time-picker">
            <div className="form-group">
                <label htmlFor="date">Select Date:</label>
                <DateTime
                    value={date}
                    onChange={handleDateChange}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    isValidDate={(currentDate) => !isDateUnavailable(currentDate)}
                    closeOnSelect={true}
                />
            </div>

            <div className="form-group">
                <label htmlFor="time">Select Time:</label>
                <DateTime
                    value={time}
                    onChange={handleTimeChange}
                    dateFormat={false}
                    timeFormat="HH:mm"
                    isValidDate={() => true} // Always valid because we are dealing with time
                    timeConstraints={{
                        hours: {
                            min: parseInt(timeRange[0].split(':')[0], 10),
                            max: parseInt(timeRange[1].split(':')[0], 10)
                        },
                        minutes: {
                            step: 15 // For example, show only every 15 minutes
                        }
                    }}
                    renderInput={(props) => (
                        <input
                            {...props}
                            required
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default DateTimePicker;
