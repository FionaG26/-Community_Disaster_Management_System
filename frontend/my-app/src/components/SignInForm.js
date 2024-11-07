import React, { useState } from 'react';
import logger from './loggingService'; // Make sure loggingService is in the same directory

function SignInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    logger.logInfo('Signing in volunteer', { username });

    try {
      const response = await fetch('/api/volunteers/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`Failed to sign in: ${response.statusText}`);
      }

      const result = await response.json();
      logger.logInfo('Volunteer signed in successfully', { volunteerId: result.volunteer_id });
      // Redirect or show a success message
    } catch (error) {
      logger.logError('Error signing in volunteer', { errorMessage: error.message });
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="SignInForm mt-4">
      <h2>Volunteer Sign In</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="cta-button">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
