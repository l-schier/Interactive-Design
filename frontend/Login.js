// Login.js

import React, { useState } from 'react';

function Login({ onLogin, onSignupClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Validate email and password (add validation logic as needed)
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Sign In
        </button>
      </form>
      <p>Don't have an account? <span onClick={onSignupClick}>Sign Up</span></p>
    </div>
  );
}

export default Login;
