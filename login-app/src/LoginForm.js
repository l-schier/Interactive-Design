import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigation function

  const handleLogin = () => {
    // You would typically perform authentication here.
    // For simplicity, we'll navigate to the '/welcome' route when the login button is clicked.
    if (username && password) {
      navigate('/welcome');
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
          onClick={handleLogin}
          style={{ background: '#355070', color: '#EAAC8B' }}
        >
          Login
        </button>
      </form>
      <div style={{ marginTop: '10px', color: '#EAAC8B' }}>
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </div>
    </div>
  );
};

export default LoginForm;
