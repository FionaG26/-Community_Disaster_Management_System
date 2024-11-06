// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import logger from './loggingService';

function Dashboard() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        logger.logInfo('Dashboard component loaded');
        
        const fetchIncidents = async () => {
            try {
                const response = await fetch('/api/incidents');
                if (!response.ok) {
                    throw new Error(`Failed to fetch incidents: ${response.statusText}`);
                }
                const data = await response.json();
                setIncidents(data);
                logger.logInfo('Fetched incidents successfully', { count: data.length });
            } catch (error) {
                logger.logError('Error fetching incidents', { errorMessage: error.message });
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

    const handleViewIncident = (incidentId) => {
        logger.logInfo('Viewing incident details', { incidentId });
    };

    if (loading) {
        return <div>Loading incidents...</div>;
    }

    return (
        <div className="Dashboard">
            <h2>Incident Dashboard</h2>
            {incidents.length === 0 ? (
                <p>No incidents to display.</p>
            ) : (
                <ul>
                    {incidents.map((incident) => (
                        <li key={incident.id} onClick={() => handleViewIncident(incident.id)}>
                            <strong>{incident.location}</strong>: {incident.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;
