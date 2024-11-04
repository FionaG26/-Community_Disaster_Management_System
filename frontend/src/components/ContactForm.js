// src/components/ContactForm.js

import React, { useState } from 'react';
import logger from '../loggingService';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        logger.logInfo('Submitting contact form', { name, email });

        // For simplicity, you could send this to a backend endpoint to handle
        // For now, we'll just log it
        logger.logInfo('Contact message submitted', { message });

        // Reset form fields
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="ContactForm">
            <h2>Contact Us</h2>
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
