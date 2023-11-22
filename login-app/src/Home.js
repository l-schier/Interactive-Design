// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import NewPostForm from './NewPostForm';

const Home = ({ loggedInUser }) => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    onGetPosts();
  }, []);

// Function to handle adding a new post
const handleAddPost = async (newPost) => {
  // Create a FormData object to send the file along with other data
  const formData = new FormData();
  formData.append('username', loggedInUser.username);
  formData.append('title', newPost.title);
  formData.append('content', newPost.content);
  formData.append('file', newPost.file); // Assuming 'file' is the key on the server for the uploaded file

  // Send a request to create a new post with the FormData
  const response = await fetch('http://localhost:5000/createPost', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    // If the post is created successfully, fetch the updated list of posts
    onGetPosts();
  } else {
    // Handle the error case if the post creation fails
    console.error('Failed to create a post');
  }
};


  // Function to handle upvoting a post
  const handleUpvote = async (postId) => {
    // Make a fetch call to your backend to upvote the post
    const response = await fetch(`http://localhost:5000/upvote/${postId}`, {
      method: 'PUT',
    });

    if (response.ok) {
      // If the upvote is successful, update the posts
      onGetPosts();
    } else {
      // Handle error case
      console.error('Error upvoting post');
    }
  };

  // Function to handle downvoting a post
  const handleDownvote = async (postId) => {
    // Make a fetch call to your backend to downvote the post
    const response = await fetch(`http://localhost:5000/downvote/${postId}`, {
      method: 'PUT',
    });

    if (response.ok) {
      // If the downvote is successful, update the posts
      onGetPosts();
    } else {
      // Handle error case
      console.error('Error downvoting post');
    }
  };

  // Function to fetch posts from the backend
  const onGetPosts = async () => {
    // Make a fetch call to your backend to get posts
    const response = await fetch('http://localhost:5000/getPosts');

    if (response.ok) {
      const postsData = await response.json();
      setPosts(postsData);
    } else {
      // Handle error case
      console.error('Error fetching posts');
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%', backgroundColor: '#212529', color: '#EAAC8B' }}>
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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <h1>Welcome to My App!</h1>

        {/* Conditionally render NewPostForm if the user is logged in */}
        {loggedInUser && <NewPostForm onAddPost={handleAddPost} />}

        <h2>User Posts</h2>

        {/* Map through posts and render each post using the Post component */}
        {posts.map((post) => (
          <Post
            key={post.id} // Assuming each post has a unique identifier
            post={post}
            onUpvote={() => handleUpvote(post.id)}
            onDownvote={() => handleDownvote(post.id)}
            loggedInUser={loggedInUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
