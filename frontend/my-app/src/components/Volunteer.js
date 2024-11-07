import React from 'react';
import VolunteerRegistration from './VolunteerRegistration';

const Volunteer = () => (
  <section id="volunteer" className="container py-5">
    <h2 className="section-title">Become a Volunteer</h2>
    <p>Volunteers are the heart of our organization. By signing up, you can help provide critical support to communities in need. Whether it's in the field, in shelters, or coordinating relief efforts, there's a place for you.</p>
    
    {/* Main Call-to-Action Button */}
    <button className="cta-button">Sign Up to Volunteer</button>

    {/* Volunteer Registration Form */}
    <VolunteerRegistration />
  </section>
);

export default Volunteer;
