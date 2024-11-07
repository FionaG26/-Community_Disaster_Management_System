import React, { useState } from 'react';
import VolunteerRegistration from './VolunteerRegistration'; // Import VolunteerRegistration
import SignInForm from './SignInForm'; // Import SignInForm

const Volunteer = () => {
  const [formType, setFormType] = useState('register'); // State to toggle between register and sign in form

  // Toggle between Register and Sign In forms
  const toggleForm = () => {
    setFormType(formType === 'register' ? 'signin' : 'register');
  };

  return (
    <section id="volunteer" className="container py-5">
      <h2 className="section-title">Become a Volunteer</h2>
      <p>Volunteers are the heart of our organization. By signing up, you can help provide critical support to communities in need. Whether it's in the field, in shelters, or coordinating relief efforts, there's a place for you.</p>

      {/* Main Call-to-Action Button */}
      <button className="cta-button" onClick={toggleForm}>
        {formType === 'register' ? 'Already a volunteer? Sign In' : 'New Volunteer? Register'}
      </button>

      {/* Conditionally Render Register or Sign In Form */}
      {formType === 'register' ? <VolunteerRegistration /> : <SignInForm />}
    </section>
  );
};

export default Volunteer;
