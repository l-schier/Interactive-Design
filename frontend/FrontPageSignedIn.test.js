import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FrontPageSignedIn from './FrontPageSignedIn';

// Mocked props for testing
const mockedUser = {
  id: 1,
  username: 'testuser',
};

const mockedPosts = [
  {
    id: 1,
    title: 'Test Post 1',
    description: 'This is a test post 1',
    voteCount: 10,
    comments: [],
  },
  {
    id: 2,
    title: 'Test Post 2',
    description: 'This is a test post 2',
    voteCount: 5,
    comments: [],
  },
];

// Mocked callback functions
const mockedVoteCallback = jest.fn();
const mockedCommentCallback = jest.fn();
const mockedReportCallback = jest.fn();
const mockedLogoutCallback = jest.fn();

test('FrontPageSignedIn renders correctly', () => {
  const { getByText } = render(
    <FrontPageSignedIn
      user={mockedUser}
      posts={mockedPosts}
      onVote={mockedVoteCallback}
      onComment={mockedCommentCallback}
      onReport={mockedReportCallback}
      onLogoutClick={mockedLogoutCallback}
    />
  );

  // Check if user's username is displayed
  const usernameElement = getByText(`Welcome, ${mockedUser.username}`);
  expect(usernameElement).toBeInTheDocument();

  // Check if posts are displayed
  for (const post of mockedPosts) {
    const postTitleElement = getByText(post.title);
    const postDescriptionElement = getByText(post.description);
    const voteCountElement = getByText(`Votes: ${post.voteCount}`);

    expect(postTitleElement).toBeInTheDocument();
    expect(postDescriptionElement).toBeInTheDocument();
    expect(voteCountElement).toBeInTheDocument();

    // Simulate upvoting a post
    const upvoteButton = getByText('Upvote');
    fireEvent.click(upvoteButton);
    expect(mockedVoteCallback).toHaveBeenCalledWith(post.id, 'upvote');

    // Simulate commenting on a post
    const commentButton = getByText('Comment');
    fireEvent.click(commentButton);
    expect(mockedCommentCallback).toHaveBeenCalledWith(post.id, 'Sample Comment');

    // Simulate reporting a post
    const reportButton = getByText('Report');
    fireEvent.click(reportButton);
    expect(mockedReportCallback).toHaveBeenCalledWith(post.id);
  }

  // Check if logout button is displayed and triggers the callback
  const logoutButton = getByText('Logout');
  fireEvent.click(logoutButton);
  expect(mockedLogoutCallback).toHaveBeenCalled();
});
