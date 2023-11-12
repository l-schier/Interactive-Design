// Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ loggedInUser }) => {
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <nav style={{ backgroundColor: '#355070', color: '#EAAC8B', padding: '10px' }}>
        <Link to="/">My App</Link>
        {loggedInUser ? (
          <span style={{ float: 'right', marginRight: '10px' }}>Welcome, {loggedInUser.username}!</span>
        ) : (
          <div style={{ float: 'right' }}>
            <Link to="/login" style={{ marginRight: '10px', color: '#EAAC8B' }}>Login</Link>
            <Link to="/signup" style={{ color: '#EAAC8B' }}>Signup</Link>
          </div>
        )}
      </nav>

      <div style={{ padding: '20px', backgroundColor: '#212529', color: '#EAAC8B', height: '100%' }}>
        <h1>Welcome to My App!</h1>

        <div>
          <h2>User Posts</h2>
          <div style={{ border: '1px solid #D9D9D9', padding: '10px', marginBottom: '10px' }}>
            <h3>Post Title</h3>
            <p>Post content goes here...</p>
            <div>
              <button>Upvote</button>
              <button>Downvote</button>
              <Link to="/comments">Comments</Link>
            </div>
          </div>

          {/* Add more posts as needed */}
        </div>
      </div>
    </div>
  );
};

export default Home;
