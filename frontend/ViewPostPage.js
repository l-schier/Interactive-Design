import React, { useState } from 'react';

const ViewPostPage = ({ post }) => {
  const [voteCount, setVoteCount] = useState(post.votes);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments);

  const handleUpvote = () => {
    // Simulate an API call to upvote the post
    // Replace this with your actual API call
    // Update the vote count in the state
    setVoteCount(voteCount + 1);
  };

  const handleDownvote = () => {
    // Simulate an API call to downvote the post
    // Replace this with your actual API call
    // Update the vote count in the state
    setVoteCount(voteCount - 1);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() === '') return;

    // Simulate an API call to add a comment
    // Replace this with your actual API call
    const newComment = {
      id: comments.length + 1, // Generate a unique ID for the new comment
      text: commentText,
      votes: 0, // Initialize the comment with 0 votes
    };

    // Update the comments array in the state
    setComments([...comments, newComment]);

    // Clear the comment input field
    setCommentText('');
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <img src={post.image} alt={post.title} />
      <p>{post.bodyText}</p>
      <p>{voteCount} votes</p>
      <button
        data-testid="upvote-button"
        onClick={handleUpvote}
        disabled={false} // Add logic to disable the button after voting
      >
        Upvote
      </button>
      <button
        data-testid="downvote-button"
        onClick={handleDownvote}
        disabled={false} // Add logic to disable the button after voting
      >
        Downvote
      </button>

      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.text}
            <p>{comment.votes} votes</p>
          </li>
        ))}
      </ul>

      <div>
        <textarea
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ViewPostPage;
