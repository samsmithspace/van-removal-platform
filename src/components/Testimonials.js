// Testimonials.jsx
import React, { useState } from 'react';
import './Testimonials.css';
import { useTranslation } from 'react-i18next';
import { FaQuoteLeft, FaChevronDown, FaChevronUp, FaStar } from 'react-icons/fa';

const FAQItem = ({ faq, index, isOpen, toggleFAQ }) => (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
        <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <h5>{faq.question}</h5>
            <span className="toggle-icon">
               {isOpen ? <FaChevronUp /> : <FaChevronDown />}
           </span>
        </div>
        <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
            <p>{faq.answer}</p>
        </div>
    </div>
);

const Testimonials = () => {
    const { t } = useTranslation();
    const [openFAQIndex, setOpenFAQIndex] = useState(0); // Set first FAQ open by default

    const toggleFAQ = (index) => {
        setOpenFAQIndex(openFAQIndex === index ? null : index);
    };

    // Function to generate placeholder avatar url with customer initials
    const getInitialsAvatar = (name) => {
        const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
        const colors = ['#FF5722', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#009688'];
        const colorIndex = name.length % colors.length;
        return `https://ui-avatars.com/api/?name=${initials}&background=${colors[colorIndex].substring(1)}&color=fff&size=100`;
    };

    // Function to generate random rating between 4 and 5 stars
    const generateRating = (name) => {
        // Use the name as a seed to generate consistent ratings
        const seed = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return (seed % 2 === 0) ? 5 : 4.5;
    };

    return (
        <div className="testimonials-container">
            <div className="section-header">
                <h2>{t('whatCustomersSay')}</h2>
                <div className="section-divider"></div>
            </div>

            <div className="testimonials-grid">
                {t('testimonials', { returnObjects: true }).map((testimonial, index) => {
                    const rating = generateRating(testimonial.name);

                    return (
                        <div key={index} className="testimonial-card">
                            <div className="quote-icon">
                                <FaQuoteLeft />
                            </div>
                            <div className="testimonial-content">
                                <p>{testimonial.text}</p>
                                <div className="rating">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={i < Math.floor(rating) ? 'star filled' : i < rating ? 'star half-filled' : 'star'}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="testimonial-author">
                                <img
                                    src={testimonial.avatar || getInitialsAvatar(testimonial.name)}
                                    alt={testimonial.name}
                                    className="author-avatar"
                                />
                                <div className="author-info">
                                    <h4>{testimonial.name}</h4>
                                    {testimonial.location && <p className="author-location">{testimonial.location}</p>}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
                <div className="section-header">
                    <h2>{t('frequentlyAskedQuestions')}</h2>
                    <div className="section-divider"></div>
                </div>

                <div className="faq-container">
                    {t('faqs', { returnObjects: true }).map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            index={index}
                            isOpen={openFAQIndex === index}
                            toggleFAQ={toggleFAQ}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
