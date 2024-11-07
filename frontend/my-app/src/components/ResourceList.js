import { useEffect, useState } from "react";

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch("/api/resources/")
      .then((response) => response.json())
      .then((data) => setResources(data))
      .catch((error) => console.error("Error fetching resources:", error));
  }, []);

  return (
    <div>
      <h1>Resource List</h1>
      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            {resource.name}: {resource.quantity} available at {resource.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;
