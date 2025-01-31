import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';
import bt21 from '../assets/images/bt21.png';
import bt23 from '../assets/images/btn3.png';
import bt24 from '../assets/images/btn4.png';
import slidingImage from '../assets/images/vanvan.png'; // Replace with actual image

const HeroSection = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [slideIn, setSlideIn] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);



    const handleScroll = () => {

        const position = window.pageYOffset;

        setScrollPosition(position);

    };



    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        return () => {

            window.removeEventListener('scroll', handleScroll);

        };

    }, []);


    useEffect(() => {
        setTimeout(() => setSlideIn(true), 500); // Delay before sliding in
    }, []);

    const handleStudentMoveClick = () => {
        navigate('/location', { state: { locationType: 'student' } });
    };

    const handleHouseMoveClick = () => {
        navigate('/location', { state: { locationType: 'house' } });
    };

    const handleSameDayMoveClick = () => {
        navigate('/location', { state: { locationType: 'house' } });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="hero-container">
            <header className={`header ${scrollPosition > 0 ? 'scrolled' : ''}`}>
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="headertext">
                        <h1>Eremovals</h1>
                    </div>
                    <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                        <ul className="nav-links d-flex">
                            <li>
                                <button onClick={handleStudentMoveClick}>Student Move</button>
                            </li>
                            <li>
                                <button onClick={handleHouseMoveClick}>Home Move</button>
                            </li>
                            <li>
                                <button onClick={handleSameDayMoveClick}>Same Day Move</button>
                            </li>
                        </ul>
                    </nav>
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <span className="menu-icon">{isMenuOpen ? '✖' : '☰'}</span>
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <div className="hero-section d-flex align-items-center justify-content-center text-center">
                <div className="hero-content text-white">
                    <h2>Student Moving Made Easy in Edinburgh!</h2>
                    <div className="move-buttons-container">
                        <button className="btn2 st" onClick={handleStudentMoveClick}>
                            Student Move
                            <img src={bt21} alt="Decoration" className="btn2-img"/>
                        </button>
                        <button className="btn2 hm" onClick={handleHouseMoveClick}>
                            Home Move
                            <img src={bt23} alt="Decoration" className="btn3-img"/>
                        </button>
                        <button className="btn2 sd" onClick={handleSameDayMoveClick}>
                            Same Day Move
                            <img src={bt24} alt="Decoration" className="btn4-img"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Sliding Image */}
            <img
                src={slidingImage}
                alt="Sliding effect"
                className={`sliding-image ${slideIn ? 'slide-in' : ''}`}
            />
        </div>
    );
};

export default HeroSection;
