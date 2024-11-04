import React, { useState } from 'react';

function IncidentForm() {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/incidents/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location, description, severity })
    }).then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Severity:
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
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
