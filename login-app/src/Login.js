// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // include credentials (cookies) in the request
      });

      if (response.ok) {
        setLoggedInUser({ username }); // Set the logged-in user
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <nav style={{ backgroundColor: '#355070', color: '#EAAC8B', padding: '10px' }}>
        <Link to="/">My App</Link>
      </nav>

      <div style={{ padding: '20px', backgroundColor: '#212529', color: '#EAAC8B', height: 'calc(100% - 40px)' }}>
        <h1>Login</h1>

        <form>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '5px' }}
            />
          </div>

          <button type="button" onClick={handleLogin} style={{ padding: '5px' }}>
            Login
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
