import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewPostForm from './NewPostForm';

const Home = ({ loggedInUser }) => {
  const [posts, setPosts] = useState([]);

  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <nav style={{ backgroundColor: '#355070', color: '#EAAC8B', padding: '10px' }}>
        <Link to="/">My App</Link>
        {loggedInUser ? (
          <span style={{ float: 'right', marginRight: '10px' }}>Welcome, {loggedInUser.username}!</span>
        ) : (
          <div style={{ float: 'right' }}>
            <Link to="/login" style={{ marginRight: '10px', color: '#EAAC8B' }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: '#EAAC8B' }}>
              Signup
            </Link>
          </div>
        )}
      </nav>

      <div style={{ padding: '20px', backgroundColor: '#212529', color: '#EAAC8B', minHeight: '100vh' }}>
        <h1>Welcome to My App!</h1>

        {loggedInUser && <NewPostForm onAddPost={handleAddPost} />}

        <div>
          <h2>User Posts</h2>

          {posts.map((post, index) => (
            <div key={index} style={{ border: '1px solid #D9D9D9', padding: '10px', marginBottom: '10px' }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.file && (
                <div>
                  <img src={URL.createObjectURL(post.file)} alt="Uploaded" style={{ maxWidth: '100%' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
