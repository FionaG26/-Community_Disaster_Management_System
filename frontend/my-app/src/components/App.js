// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logger from './loggingService';
import Dashboard from './components/Dashboard';
import IncidentForm from './components/IncidentForm';
import VolunteerRegistration from './components/VolunteerRegistration';
import IncidentDetails from './components/IncidentDetails';
import ContactForm from './components/ContactForm';
import UserProfile from './components/UserProfile'; // Import UserProfile

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
                <UserProfile /> {/* Include UserProfile here, before the router */}
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/report-incident" component={IncidentForm} />
                    <Route path="/register-volunteer" component={VolunteerRegistration} />
                    <Route path="/incident/:id" component={IncidentDetails} />
                    <Route path="/contact" component={ContactForm} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
