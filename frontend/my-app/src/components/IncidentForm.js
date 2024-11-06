// src/components/IncidentForm.js
import React, { useState } from 'react';

function IncidentForm() {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/incidents/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, description, severity }),
      });
      if (!response.ok) {
        throw new Error(`Failed to report incident: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data); // Handle success response here
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Severity:
        <select value={severity} onChange={(e) => setSeverity(e.target.value)} required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <button type="submit">Report Incident</button>
    </form>
  );
}

export default IncidentForm;
