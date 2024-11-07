// src/components/UpdateIncidentStatus.js
import React, { useState } from 'react';

const UpdateIncidentStatus = () => {
  const [incidentId, setIncidentId] = useState('');
  const [status, setStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!incidentId || !status) {
      setErrorMessage('Please provide incident ID and status.');
      return;
    }

    try {
      const response = await fetch(`/api/incidents/${incidentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update incident status');
      }

      setSuccessMessage('Incident status updated successfully');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <section id="update-incident-status" className="py-5">
      <div className="container">
        <h2 className="section-title text-center">Update Incident Status</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          
          <div className="form-group">
            <label htmlFor="incidentId">Incident ID</label>
            <input
              type="number"
              className="form-control"
              id="incidentId"
              value={incidentId}
              onChange={(e) => setIncidentId(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              className="form-control"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select status</option>
              <option value="reported">Reported</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          
          <button type="submit" className="cta-button">Update Status</button>
        </form>
      </div>
    </section>
  );
};

export default UpdateIncidentStatus;
