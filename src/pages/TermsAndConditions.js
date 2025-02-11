import React, {useState} from 'react';

import { useTranslation } from 'react-i18next';
import '../components/TermsAndConditions.css'; // Add relevant CSS for styling

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
    const { t } = useTranslation();
    const [openFAQIndex, setOpenFAQIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQIndex(openFAQIndex === index ? null : index);
    };

    return (
        <div className="my-5">
            <h2 className="text-center mb-4">{t('whatCustomersSay')}</h2>
            <div className="row">
                {t('testimonials', { returnObjects: true }).map((testimonial, index) => (
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
                <h2 className="text-center mb-4">{t('frequentlyAskedQuestions')}</h2>
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
    );
};

export default Testimonials;