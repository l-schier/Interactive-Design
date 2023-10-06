import React from 'react';

const ViewUserPostsPage = ({ user, userPosts, onDelete }) => {
  return (
    <div>
      <h1>Your Posts</h1>
      {userPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>{post.bodyText}</p>
          <button onClick={() => onDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ViewUserPostsPage;
