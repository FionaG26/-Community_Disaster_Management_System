import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import IncidentForm from './components/IncidentForm';
import logger from './loggingService';

function App() {
    useEffect(() => {
        // Log when the App component loads
        logger.logInfo('App component loaded');

        // Log button click
        const handleButtonClick = () => {
            logger.logInfo('Button clicked', { buttonId: 'myButton' });
        };

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
                <h1>Centralized Logging Example</h1>
                <button id="myButton" onClick={() => logger.logInfo('Button clicked')}>Click me</button>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/report-incident" component={IncidentForm} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
