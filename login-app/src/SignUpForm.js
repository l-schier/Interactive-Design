import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        mode: 'cors', // Add this line
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });


      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to sign up');
        return;
      }

      navigate('/login');
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label style={{ color: '#EAAC8B' }}>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ background: '#D9D9D9' }}
          />
        </label>
        <br />
        <label style={{ color: '#EAAC8B' }}>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ background: '#D9D9D9' }}
          />
        </label>
        <br />
        <button
          type="button"
          onClick={handleSignUp}
          style={{ background: '#355070', color: '#EAAC8B' }}
        >
          Sign Up
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      <div style={{ marginTop: '10px', color: '#EAAC8B' }}>
        Already have an account? <Link to="/login">Log in here</Link>.
      </div>
    </div>
  );
};

export default SignUpForm;
