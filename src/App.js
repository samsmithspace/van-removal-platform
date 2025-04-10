import React, { useEffect } from 'react';
import './i18n';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useParams,
    Navigate,
    useLocation,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuotePage from './pages/QuotePage';
import LocationSelection from './pages/LocationSelection';
import BookingResult from './pages/BookingResult';
import TermsAndConditions from './pages/TermsAndConditions';
import PaymentCancellation from './pages/PaymentCancellation';
import i18n from 'i18next';

// Layout to handle language changes
const LanguageLayout = () => {
    const { lang } = useParams();

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/location" element={<LocationSelection />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/booking-result" element={<BookingResult />} />
            <Route path="/booking-cancel" element={<PaymentCancellation />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
    );
};

// Redirect any non-prefixed path to the default language
const RedirectToDefaultLang = () => {
    const location = useLocation();
    const defaultLang = 'en';

    return <Navigate to={`/${defaultLang}${location.pathname}`} replace />;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Root path goes to default language home */}
                <Route path="/" element={<Navigate to="/en" replace />} />

                {/* All language-prefixed routes */}
                <Route path="/:lang/*" element={<LanguageLayout />} />

                {/* Fallback: if someone visits /quote, /location, etc., redirect to /en/... */}
                <Route path="/*" element={<RedirectToDefaultLang />} />
            </Routes>
        </Router>
    );
}

export default App;
