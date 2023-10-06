import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ViewUserPostsPage from './ViewUserPostsPage';

describe('ViewUserPostsPage', () => {
  it('renders user posts', () => {
    // Mock user data
    const user = { id: 1, username: 'testuser' };
    const userPosts = [
      { id: 1, title: 'Post 1', description: 'Description 1', bodyText: 'Body Text 1' },
      { id: 2, title: 'Post 2', description: 'Description 2', bodyText: 'Body Text 2' },
    ];

    render(<ViewUserPostsPage user={user} userPosts={userPosts} onDelete={() => {}} />);

    // Check if user posts are displayed
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    // Mock user data
    const user = { id: 1, username: 'testuser' };
    const userPosts = [
      { id: 1, title: 'Post 1', description: 'Description 1', bodyText: 'Body Text 1' },
      { id: 2, title: 'Post 2', description: 'Description 2', bodyText: 'Body Text 2' },
    ];

    // Mock onDelete callback
    const onDeleteMock = jest.fn();

    render(<ViewUserPostsPage user={user} userPosts={userPosts} onDelete={onDeleteMock} />);

    // Find delete buttons and click one of them
    const deleteButton = screen.getByText('Delete');
    userEvent.click(deleteButton);

    // Check if onDelete callback was called
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
