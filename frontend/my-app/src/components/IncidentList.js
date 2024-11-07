// src/components/IncidentList.js
import React, { useState, useEffect } from 'react';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch('/api/incidents/');
        if (!response.ok) {
          throw new Error('Failed to fetch incidents');
        }
        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    
    fetchIncidents();
  }, []);

  return (
    <section id="incident-list" className="py-5">
      <div className="container">
        <h2 className="section-title text-center">Incident List</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="row">
          {incidents.map((incident) => (
            <div key={incident.id} className="col-md-4">
              <div className="incident-card">
                <h5>{incident.location}</h5>
                <p>{incident.description}</p>
                <p><strong>Severity:</strong> {incident.severity}</p>
                <p><strong>Status:</strong> {incident.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncidentList;
