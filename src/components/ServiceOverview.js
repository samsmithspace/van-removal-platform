import React from 'react';

const services = [
    { icon: 'path/to/icon1.svg', title: 'Moving', description: 'Reliable moving services' },
    { icon: 'path/to/icon2.svg', title: 'Packing', description: 'Professional packing solutions' },
    { icon: 'path/to/icon3.svg', title: 'Storage', description: 'Secure storage facilities' },
];

const ServiceOverview = () => {
    return (
        <div className="row text-center my-5">
            <h2 className="col-12 mb-4">Our Services</h2>
            {services.map((service, index) => (
                <div key={index} className="col-12 col-md-4">
                    <img src={service.icon} alt={service.title} className="img-fluid mb-3" style={{maxHeight: '100px'}}/>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ServiceOverview;
