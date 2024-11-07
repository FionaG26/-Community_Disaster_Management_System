// src/components/IncidentReport.js
import React, { useState } from 'react';

const IncidentReport = () => {
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    severity: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { location, description, severity } = formData;

    // Basic validation
    if (!location || !description || !severity) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      // Send data to backend to report the incident
      const response = await fetch('/api/incidents/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to report incident');
      }

      const data = await response.json();
      setSuccessMessage(`Incident reported successfully. Incident ID: ${data.incident_id}`);
      setErrorMessage('');
      setFormData({
        location: '',
        description: '',
        severity: '',
      });
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <section id="incident-report" className="py-5">
      <div className="container">
        <h2 className="section-title text-center">Report an Incident</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Describe the incident"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="severity">Severity</label>
            <select
              className="form-control"
              id="severity"
              value={formData.severity}
              onChange={handleChange}
            >
              <option value="">Select severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <button type="submit" className="cta-button">Report Incident</button>
        </form>
      </div>
    </section>
  );
};

export default IncidentReport;
