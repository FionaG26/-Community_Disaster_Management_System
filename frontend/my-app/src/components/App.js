// src/components/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logger from './loggingService';
import Dashboard from './Dashboard';
import IncidentForm from './IncidentForm';
import VolunteerRegistration from './VolunteerRegistration';
import IncidentDetails from './IncidentDetails';
import ContactForm from './ContactForm';
import UserProfile from './UserProfile';
import ErrorBoundary from './ErrorBoundary';

function App() {
    useEffect(() => {
        // Log when the App component loads
        logger.logInfo('App component loaded');

        // Example error logging
        try {
            throw new Error("Sample error for logging");
        } catch (error) {
            logger.logError('An error occurred', { errorMessage: error.message });
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <UserProfile /> {/* Include UserProfile before the router */}
                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/report-incident" element={<IncidentForm />} />
                        <Route path="/register-volunteer" element={<VolunteerRegistration />} />
                        <Route path="/incident/:id" element={<IncidentDetails />} />
                        <Route path="/contact" element={<ContactForm />} />
                    </Routes>
                </ErrorBoundary>
            </div>
        </Router>
    );
}

export default App;
