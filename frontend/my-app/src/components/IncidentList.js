import { useEffect, useState } from "react";

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch("/api/incidents/")
      .then((response) => response.json())
      .then((data) => setIncidents(data))
      .catch((error) => console.error("Error fetching incidents:", error));
  }, []);

  return (
    <div>
      <h1>Incident List</h1>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>{incident.location}</strong>: {incident.description} (Severity: {incident.severity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentList;
