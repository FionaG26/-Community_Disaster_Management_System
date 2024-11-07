import React, { useState } from 'react';
import logger from './loggingService'; // Make sure loggingService is in the same directory

function VolunteerRegistration() {
  const [username, setUsername] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic form validation
    if (!username || !contactInfo) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    logger.logInfo('Registering volunteer', { username, contactInfo });

    try {
      const response = await fetch('/api/volunteers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, contact_info: contactInfo }),
      });

      if (!response.ok) {
        throw new Error(`Failed to register volunteer: ${response.statusText}`);
      }

      const result = await response.json();
      logger.logInfo('Volunteer registered successfully', { volunteerId: result.volunteer_id });

      // Reset form fields and show success message
      setUsername('');
      setContactInfo('');
      setSuccessMessage('Registration successful! Thank you for volunteering.');

    } catch (error) {
      logger.logError('Error registering volunteer', { errorMessage: error.message });
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="VolunteerRegistration mt-4">
      <h2>Volunteer Registration</h2>

      {/* Success message */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Error message */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Full Name</label>
          <input
            id="username"
            type="text"
            className="form-control"
            placeholder="Enter your full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactInfo">Email Address</label>
          <input
            id="contactInfo"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="cta-button">Register</button>
      </form>
    </div>
  );
}

export default VolunteerRegistration;
