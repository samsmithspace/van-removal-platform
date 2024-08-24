import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuotePage from './pages/QuotePage';
import BookingPage from './pages/BookingPage';
import LocationSelection from './pages/LocationSelection';
import BookingResult from './pages/BookingResult'; // Import the new BookingResult component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/location" element={<LocationSelection />} />
                <Route path="/quote" element={<QuotePage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/booking-result" element={<BookingResult />} /> {/* BookingResult remains here */}
            </Routes>
        </Router>
    );
}

export default App;
