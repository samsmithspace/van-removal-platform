import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuotePage from './pages/QuotePage';
//import BookingPage from './pages/BookingPage';
import LocationSelection from './pages/LocationSelection';
import BookingResult from './pages/BookingResult';
import TermsAndConditions from './pages/TermsAndConditions';
import PaymentCancellation from "./pages/PaymentCancellation"; // Import the Terms and Conditions component


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/location" element={<LocationSelection />} />
                <Route path="/quote" element={<QuotePage />} />

                <Route path="/booking-result" element={<BookingResult />} />
                <Route path="/booking-cancel" element={<PaymentCancellation />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} /> {/* Add the route */}
            </Routes>
        </Router>
    );
}

export default App;
