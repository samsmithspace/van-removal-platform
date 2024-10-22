import React, { useState } from 'react';
import './Testimonials.css'
const testimonials = [
    { name: 'Nina', text: 'The team was incredibly helpful during my move. They handled everything with care, and the entire process was stress-free. I’ll definitely be using their services again.' },
    { name: 'Josh', text: 'I had to relocate on short notice, and they managed to fit me in. The movers were punctual, professional, and got everything done faster than I expected. Highly recommend!' },
    { name: 'Prescott', text: 'I was worried about my fragile items, but they packed everything so securely. Not a single item was damaged during the move. Great experience overall.' },
    { name: 'Calvin', text: 'Super efficient and friendly crew! They made what could have been a stressful day really easy for us. It’s rare to find a company this reliable these days.' }
];


const faqs = [
    { question: 'How much does your service cost?', answer: 'Our pricing depends on the type and size of the move. Contact us for a detailed quote.' },
    { question: 'What areas do you serve?', answer: 'We based in Edinburgh and operate in several cities. We offer nationwide moving services.' },
    { question: 'Can I change my moving date after booking?', answer: 'Yes, you can modify your moving date as long as you notify us at least 72 hours in advance.' },
    { question: 'Do you provide packing services?', answer: 'Yes, we offer full packing services to ensure your items are safely transported.' },
];

const FAQItem = ({ faq, index, isOpen, toggleFAQ }) => (
    <div className="faq-item">
        <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <h5>{faq.question}</h5>
            <span>{isOpen ? '-' : '+'}</span>
        </div>
        {isOpen && <div className="faq-answer"><p>{faq.answer}</p></div>}
    </div>
);

const Testimonials = () => {
    const [openFAQIndex, setOpenFAQIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQIndex(openFAQIndex === index ? null : index);
    };

    return (
        <div className="my-5">
            <h2 className="text-center mb-4">What Our Customers Say</h2>
            <div className="row">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="col-12 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <p className="card-text">"{testimonial.text}"</p>
                                <h5 className="card-title">- {testimonial.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
                <h2 className="text-center mb-4">Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
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
    );
};

export default Testimonials;
