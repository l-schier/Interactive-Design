import React from 'react';

const FrontPageSignedIn = ({
  user,
  posts,
  onVote,
  onComment,
  onReport,
  onLogoutClick,
}) => {
  return (
    <div>
      <div>Welcome, {user.username}</div>
      <button onClick={onLogoutClick}>Logout</button>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>Votes: {post.voteCount}</p>
          <button onClick={() => onVote(post.id, 'upvote')}>Upvote</button>
          <button onClick={() => onComment(post.id, 'Sample Comment')}>Comment</button>
          <button onClick={() => onReport(post.id)}>Report</button>
        </div>
      ))}
    </div>
  );
};

export default FrontPageSignedIn;
