import React from 'react';

const testimonials = [
    { name: 'John Doe', text: 'Great service, very reliable!' },
    { name: 'Jane Smith', text: 'Fast and professional. Highly recommend!' },
];

const Testimonials = () => {
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
        </div>
    );
};

export default Testimonials;
