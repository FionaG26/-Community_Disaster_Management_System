// src/components/VolunteerRegistration.js
import React, { useState } from 'react';
import logger from './loggingService';

function VolunteerRegistration() {
    const [username, setUsername] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            // Reset form fields
            setUsername('');
            setContactInfo('');
            setErrorMessage('');
        } catch (error) {
            logger.logError('Error registering volunteer', { errorMessage: error.message });
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="VolunteerRegistration">
            <h2>Volunteer Registration</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contact Info</label>
                    <input
                        type="text"
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
