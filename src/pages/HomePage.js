import React from 'react';
import HeroSection from '../components/HeroSection';
import ServiceOverview from '../components/ServiceOverview';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import '../components/QuotePage.css';


const HomePage = () => {

    return (
        <div>
            <HeroSection />
            <div className="container">
                <ServiceOverview />
                <Testimonials />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
