import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FrontPageNotSignedIn from './FrontPageNotSignedIn';

describe('FrontPageNotSignedIn Component', () => {
  // Example mock data for posts
  const mockPosts = [
    {
      id: 1,
      title: 'Post 1',
      description: 'Description for Post 1',
      image: 'post1.jpg',
      voteCount: 10,
      commentsCount: 5,
    },
    {
      id: 2,
      title: 'Post 2',
      description: 'Description for Post 2',
      image: 'post2.jpg',
      voteCount: 5,
      commentsCount: 3,
    },
  ];

  it('renders the component with posts', () => {
    const { getByText, getAllByText } = render(
      <FrontPageNotSignedIn posts={mockPosts} />
    );

    // Check if the component renders post titles
    expect(getByText('Post 1')).toBeInTheDocument();
    expect(getByText('Post 2')).toBeInTheDocument();

    // Check if it renders vote and comment counts for each post
    expect(getByText('10 votes')).toBeInTheDocument();
    expect(getByText('5 comments')).toBeInTheDocument();

    // Check if it renders post descriptions
    expect(getByText('Description for Post 1')).toBeInTheDocument();
    expect(getByText('Description for Post 2')).toBeInTheDocument();

    // Check if it renders post images
    expect(getAllByText('View Post')).toHaveLength(2);
  });

  it('navigates to a post when clicked', () => {
    const navigateToPost = jest.fn();
    const { getByText } = render(
      <FrontPageNotSignedIn posts={mockPosts} navigateToPost={navigateToPost} />
    );

    // Click on the "View Post" link for the first post
    fireEvent.click(getByText('View Post'));

    // Check if the navigateToPost function was called with the correct post ID
    expect(navigateToPost).toHaveBeenCalledWith(1);
  });
});
