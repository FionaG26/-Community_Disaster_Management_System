// src/components/ContactForm.js
import React, { useState } from 'react';
import logger from '../loggingService';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        logger.logInfo('Submitting contact form', { name, email });

        // Log contact message
        logger.logInfo('Contact message submitted', { message });

        // Here you could also add a fetch to send the message to the backend if needed
        try {
            // Simulate sending a message
            // await fetch('your_api_endpoint', { method: 'POST', body: JSON.stringify({ name, email, message }) });

            // Reset form fields
            setName('');
            setEmail('');
            setMessage('');
            setErrorMessage('');
        } catch (error) {
            logger.logError('Error submitting contact form', { errorMessage: error.message });
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="ContactForm">
            <h2>Contact Us</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="cta-button">Send Message</button>
            </form>
        </div>
    );
}

export default ContactForm;
