import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ViewPostPage from './ViewPostPage'; // Replace with the actual import path

// Mock a sample post object
const mockPost = {
  id: 1,
  title: 'Sample Post',
  description: 'This is a test post',
  image: 'sample-image.jpg',
  bodyText: 'This is the post body text',
  comments: [
    {
      id: 1,
      text: 'First comment',
      votes: 10,
    },
    {
      id: 2,
      text: 'Second comment',
      votes: 5,
    },
  ],
  votes: 15,
};

describe('View Post Page', () => {
  it('renders the post details', () => {
    render(<ViewPostPage post={mockPost} />);
    
    // Check if post details are displayed
    expect(screen.getByText('Sample Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test post')).toBeInTheDocument();
    expect(screen.getByText('This is the post body text')).toBeInTheDocument();
    expect(screen.getByText('15 votes')).toBeInTheDocument();

    // Check if comments are displayed
    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Second comment')).toBeInTheDocument();
    expect(screen.getByText('10 votes')).toBeInTheDocument();
    expect(screen.getByText('5 votes')).toBeInTheDocument();
  });

  it('allows upvoting and downvoting', () => {
    render(<ViewPostPage post={mockPost} />);
    
    // Click on upvote button
    fireEvent.click(screen.getByTestId('upvote-button'));
    
    // Check if the upvote button is disabled after clicking
    expect(screen.getByTestId('upvote-button')).toBeDisabled();

    // Check if the updated vote count is displayed
    expect(screen.getByText('16 votes')).toBeInTheDocument();
    
    // Click on downvote button
    fireEvent.click(screen.getByTestId('downvote-button'));
    
    // Check if the downvote button is disabled after clicking
    expect(screen.getByTestId('downvote-button')).toBeDisabled();

    // Check if the updated vote count is displayed
    expect(screen.getByText('15 votes')).toBeInTheDocument();
  });

  it('allows adding a comment', () => {
    render(<ViewPostPage post={mockPost} />);
    
    // Enter comment text in the input field
    fireEvent.change(screen.getByPlaceholderText('Add a comment...'), {
      target: { value: 'New comment' },
    });

    // Click on the submit button to add the comment
    fireEvent.click(screen.getByText('Submit'));

    // Check if the new comment is displayed
    expect(screen.getByText('New comment')).toBeInTheDocument();
  });
});
