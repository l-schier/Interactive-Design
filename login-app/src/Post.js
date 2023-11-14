// Post.js
import React from 'react';

const Post = ({ post }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ marginRight: '20px' }}>
        {post.image && <img src={post.image} alt="Post" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
      </div>
      <div>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        {/* Add other post details as needed */}
      </div>
    </div>
  );
};

export default Post;
