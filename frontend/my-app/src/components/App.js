// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logger from './loggingService';
import { Dashboard, IncidentForm, VolunteerRegistration, IncidentDetails, ContactForm, UserProfile } from './components';
import ErrorBoundary from './components/ErrorBoundary';  // Create an ErrorBoundary component for handling errors

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
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/report-incident" component={IncidentForm} />
                        <Route path="/register-volunteer" component={VolunteerRegistration} />
                        <Route path="/incident/:id" component={IncidentDetails} />
                        <Route path="/contact" component={ContactForm} />
                    </Switch>
                </ErrorBoundary>
            </div>
        </Router>
    );
}

export default App;
