// SignUpForm.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigation function

  const handleSignUp = () => {
    // You would typically handle user registration here.
    // For simplicity, we'll navigate to the '/welcome' route when the sign-up button is clicked.
    if (username && password) {
      navigate('/welcome');
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
      <div style={{ marginTop: '10px', color: '#EAAC8B' }}>
        Already have an account? <Link to="/login">Log in here</Link>.
      </div>
    </div>
  );
};

export default SignUpForm;
