import React, { useState, useEffect } from 'react';
import './DateTimePicker.css';
import DateTime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios'; // Import axios for making HTTP requests

const DateTimePicker = ({ onDateChange, onTimeChange }) => {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null); // Initialize time as null
    const [availableTimePeriods, setAvailableTimePeriods] = useState([]); // State to store available time periods fetched from the backend
    const [unavailableDates, setUnavailableDates] = useState([]); // State to store unavailable dates fetched from the backend

    // Fetch unavailable dates from the backend when the component mounts
    useEffect(() => {
        const fetchUnavailableDates = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/bookings/drivers/getdate');
                setUnavailableDates(response.data || []); // Ensure it's an array even if the API response is undefined
            } catch (error) {
                console.error('Error fetching unavailable dates:', error);
                setUnavailableDates([]); // Set to an empty array on error
            }
        };

        fetchUnavailableDates();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const handleDateChange = async (newDate) => {
        if (moment(newDate).isValid()) {
            setDate(newDate);
            onDateChange(newDate.format('YYYY-MM-DD'));

            try {
                const response = await axios.get('http://localhost:5000/api/bookings/drivers/available-time-periods', {
                    params: { date: newDate.format('YYYY-MM-DD') }
                });
                const periods = response.data.availableTimePeriods || [];
                setAvailableTimePeriods(periods);

                // Set default time to the beginning of the first available time period
                if (periods.length > 0) {
                    const startTime = periods[0].split('-')[0]; // Get the start time from the first time period
                    setTime(moment(startTime, 'HH:mm'));
                } else {
                    setTime(null); // No available periods, reset time
                }
            } catch (error) {
                console.error('Error fetching available time periods:', error);
                setAvailableTimePeriods([]); // Set to an empty array on error
                setTime(null); // Reset time selection on error
            }
        }
    };

    const handleTimeChange = (newTime) => {
        if (moment(newTime).isValid() && isTimeInRange(newTime)) {
            setTime(newTime);
            onTimeChange(newTime.format('HH:mm'));
        }
    };

    const isDateUnavailable = (currentDate) => {
        // Check if unavailableDates is defined and if currentDate is in the unavailableDates
        return unavailableDates && unavailableDates.includes(moment(currentDate).format('YYYY-MM-DD'));
    };

    const isTimeInRange = (currentTime) => {
        // Ensure that the selected time falls within any of the available time periods
        return availableTimePeriods.some(period => {
            const [start, end] = period.split('-').map(t => moment(t, 'HH:mm'));
            return currentTime.isBetween(start, end, 'minute', '[]');
        });
    };

    // Function to check if the date is today or in the future
    const isFutureOrToday = (currentDate) => {
        return currentDate.isSameOrAfter(moment(), 'day'); // Allow today and future dates
    };

    return (
        <div className="date-time-picker">
            <div className="form-group">
                <label htmlFor="date-input">Select Date:</label>
                <DateTime
                    id="date-input" // Adding id for the input
                    value={date}
                    onChange={handleDateChange}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    isValidDate={(currentDate) => isFutureOrToday(currentDate) && !isDateUnavailable(currentDate)} // Updated validation logic
                    closeOnSelect={true}
                    inputProps={{ id: 'date-input' }} // Ensure the input inside DateTime gets the same id
                />
            </div>

            {/* Conditionally render the "Select Time" section only if a date is selected and time periods are available */}
            {date && availableTimePeriods.length > 0 && (
                <div className="form-group">
                    <label htmlFor="time-input">Select Time:</label>
                    <DateTime
                        id="time-input" // Adding id for the input
                        value={time}
                        onChange={handleTimeChange}
                        dateFormat={false}
                        timeFormat="HH:mm"
                        isValidDate={() => true} // Always valid because we are dealing with time
                        timeConstraints={{
                            hours: {
                                min: availableTimePeriods.length > 0 ? parseInt(availableTimePeriods[0].split('-')[0].split(':')[0], 10) : 0,
                                max: availableTimePeriods.length > 0 ? parseInt(availableTimePeriods[availableTimePeriods.length - 1].split('-')[1].split(':')[0], 10) : 24
                            },
                            minutes: {
                                step: 15 // For example, show only every 15 minutes
                            }
                        }}
                        renderInput={(props) => (
                            <input
                                {...props}
                                id="time-input" // Ensure the input inside DateTime gets the same id
                                required
                            />
                        )}
                    />
                </div>
            )}

            {/* Optionally, show a message if no time periods are available */}
            {date && availableTimePeriods.length === 0 && (
                <div>No available time periods for the selected date.</div>
            )}
        </div>
    );
};

export default DateTimePicker;
