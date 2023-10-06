import React from 'react';

const FrontPageNotSignedIn = ({ posts, navigateToPost }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>{post.voteCount} votes</p>
          <p>{post.commentsCount} comments</p>
          <a href="#" onClick={() => navigateToPost(post.id)}>View Post</a>
        </div>
      ))}
    </div>
  );
};

export default FrontPageNotSignedIn;
