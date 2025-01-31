import React from 'react';
import './ServiceOverview.css'; // Import the CSS file

const services = [
    { icon: 'path/to/icon1.svg', title: 'Moving', description: 'Reliable moving services' },
    { icon: 'path/to/icon2.svg', title: 'Packing', description: 'Professional packing solutions' },
];

const ServiceOverview = () => {
    return (
        <div>

            {/* Service Overview Section */}
            <div className="service-overview">
                <div className="why-choose-us">
                    <h3 style={{ textAlign: 'center' }}>Why Choose Us?</h3>
                    <ul>
                        <p>✅ Affordable Rates – Perfect for student budgets</p>
                        <p>✅ Quick & Reliable Service – We work around your schedule</p>
                        <p>✅ Professional Team – Stress-free, hassle-free moves</p>
                        <p>✅ Big or Small Moves – From a single box to your full setup</p>
                    </ul>
                </div>
                <h1>Our Services</h1>
                <div className="row text-center">
                    {services.map((service, index) => (
                        <div key={index} className="col-12 col-md-4 service-item">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceOverview;
