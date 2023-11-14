// Post.js
import React from 'react';
import upArrow from './up-arrow.png';  // Import your up arrow image
import downArrow from './down-arrow.png';  // Import your down arrow image

const Post = ({ post, onUpvote, onDownvote, loggedInUser }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ marginRight: '20px' }}>
        {post.image && <img src={post.image} alt="Post" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
      </div>
      <div>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <div>
          {/* Upvote button */}
          {loggedInUser && !post.hasVoted && (
            <button onClick={onUpvote}>
              <img src={upArrow} alt="Upvote" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
            </button>
          )}

          {/* Total votes */}
          <span style={{ margin: '0 10px' }}>{post.upvotes - post.downvotes}</span>

          {/* Downvote button */}
          {loggedInUser && !post.hasVoted && (
            <button onClick={onDownvote}>
              <img src={downArrow} alt="Downvote" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
