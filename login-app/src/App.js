import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = () => {
    // You would typically perform authentication here.
    // For simplicity, we'll navigate to the '/welcome' route when the login button is clicked.
    const navigate = useNavigate();
    if (this.state.username && this.state.password) {
      navigate('/welcome');
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label style={{ color: '#EAAC8B' }}>
            Username:
            <input
              type="text"
              name="username"
              onChange={this.handleChange}
              style={{ background: '#D9D9D9' }}
            />
          </label>
          <br />
          <label style={{ color: '#EAAC8B' }}>
            Password:
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              style={{ background: '#D9D9D9' }}
            />
          </label>
          <br />
          <button
            type="button"
            onClick={this.handleLogin}
            style={{ background: '#355070', color: '#EAAC8B' }}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

class Login extends Component {
  render() {
    return (
      <Router>
        <div style={{ background: '#212529', color: '#EAAC8B', textAlign: 'center' }}>
          <div style={{ background: '#355070', padding: '10px' }}>
            <h2>My Social Media App</h2>
          </div>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

const Welcome = () => {
  return (
    <div>
      Welcome, User!
    </div>
  );
};

export default Login;
