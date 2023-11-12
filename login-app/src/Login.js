// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUsers } from './usersData'; // Import getUsers

const Login = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = getUsers();
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      setLoggedInUser(user); // Set the logged-in user
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <nav style={{ backgroundColor: '#355070', color: '#EAAC8B', padding: '10px' }}>
        <Link to="/">My App</Link>
      </nav>

      <div style={{ padding: '20px', backgroundColor: '#212529', color: '#EAAC8B' }}>
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
