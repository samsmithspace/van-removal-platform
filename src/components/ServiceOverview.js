import React from 'react';
import './ServiceOverview.css'; // Import the CSS file

const services = [
    { icon: 'path/to/icon1.svg', title: 'Moving', description: 'Reliable moving services' },
    { icon: 'path/to/icon2.svg', title: 'Packing', description: 'Professional packing solutions' },
];

const ServiceOverview = () => {
    return (
        <div className="service-overview">
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
    );
};

export default ServiceOverview;
