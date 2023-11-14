// Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import NewPostForm from './NewPostForm';

const Home = ({ loggedInUser }) => {
  const [posts, setPosts] = useState([]);

  // Function to handle adding a new post
  const handleAddPost = (newPost) => {
    newPost.image = newPost.file ? URL.createObjectURL(newPost.file) : null;
    setPosts([...posts, newPost]);
    // Reset the form fields after adding a post
    // You can do this by passing a callback to NewPostForm to clear the fields
  };

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

      <div style={{ padding: '20px', backgroundColor: '#212529', color: '#EAAC8B', height: '100%', overflowY: 'auto' }}>
        <h1>Welcome to My App!</h1>

        {/* Conditionally render NewPostForm if the user is logged in */}
        {loggedInUser && <NewPostForm onAddPost={handleAddPost} />}

        <h2>User Posts</h2>

        {/* Map through posts and render each post using the Post component */}
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
