import React, { useState } from 'react';
import VolunteerRegistration from './VolunteerRegistration'; // Import VolunteerRegistration

const Volunteer = () => {
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  // Toggle the visibility of the VolunteerRegistration form
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <section id="volunteer" className="container py-5">
      <h2 className="section-title">Become a Volunteer</h2>
      <p>Volunteers are the heart of our organization. By signing up, you can help provide critical support to communities in need. Whether it's in the field, in shelters, or coordinating relief efforts, there's a place for you.</p>

      {/* Main Call-to-Action Button */}
      <button className="cta-button" onClick={toggleForm}>
        {showForm ? 'Cancel Registration' : 'Sign Up to Volunteer'}
      </button>

      {/* Conditionally Render VolunteerRegistration Form */}
      {showForm && <VolunteerRegistration />}
    </section>
  );
};

export default Volunteer;
