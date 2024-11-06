// src/components/IncidentDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logger from '../loggingService';

function IncidentDetails() {
    const { id } = useParams();
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        logger.logInfo('Loading incident details', { incidentId: id });

        const fetchIncidentDetails = async () => {
            try {
                const response = await fetch(`/api/incidents/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch incident details: ${response.statusText}`);
                }
                const data = await response.json();
                setIncident(data);
                logger.logInfo('Fetched incident details successfully', { incidentId: data.id });
            } catch (error) {
                logger.logError('Error fetching incident details', { errorMessage: error.message });
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIncidentDetails();
    }, [id]);

    if (loading) {
        return <div>Loading incident details...</div>;
    }

    if (errorMessage) {
        return <div className="alert alert-danger">{errorMessage}</div>;
    }

    if (!incident) {
        return <div>No incident found.</div>;
    }

    return (
        <div className="IncidentDetails">
            <h2>Incident Details</h2>
            <p><strong>Location:</strong> {incident.location}</p>
            <p><strong>Description:</strong> {incident.description}</p>
            <p><strong>Severity:</strong> {incident.severity}</p>
            <p><strong>Status:</strong> {incident.status}</p>
        </div>
    );
}

export default IncidentDetails;
