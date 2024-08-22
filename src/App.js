import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuotePage from './pages/QuotePage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </Router>
  );
}

export default App;
