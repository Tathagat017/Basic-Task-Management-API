import { useState, useEffect } from "react";

const ApiHealthCheck = () => {
  const [apiStatus, setApiStatus] = useState<{ [key: string]: string }>({});
  const [isChecking, setIsChecking] = useState(false);

  const checkEndpoints = async () => {
    setIsChecking(true);
    const endpoints = [
      "http://localhost:8000",
      "http://localhost:8000/docs",
      "http://localhost:8000/tasks",
    ];

    const results: { [key: string]: string } = {};

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          results[endpoint] = `✅ ${response.status} OK`;
        } else {
          results[endpoint] = `❌ ${response.status} ${response.statusText}`;
        }
      } catch {
        results[endpoint] = `❌ 404 Not Found`;
      }
    }

    setApiStatus(results);
    setIsChecking(false);
  };

  useEffect(() => {
    checkEndpoints();
  }, []);

  return (
    <div className="api-health-check">
      <h3>API Health Check</h3>
      <button onClick={checkEndpoints} disabled={isChecking}>
        {isChecking ? "Checking..." : "Refresh Check"}
      </button>

      <div className="endpoint-results">
        {Object.entries(apiStatus).map(([endpoint, status]) => (
          <div key={endpoint} className="endpoint-result">
            <strong>{endpoint}</strong>: {status}
          </div>
        ))}
      </div>

      <div className="instructions">
        <h4>Instructions:</h4>
        <ol>
          <li>Make sure your backend API server is running on port 8000</li>
          <li>Check the endpoint that returns ✅ status</li>
          <li>
            Visit{" "}
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:8000/docs
            </a>{" "}
            to see available endpoints
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ApiHealthCheck;
