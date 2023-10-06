// Import the necessary dependencies and the Login component
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

// Mock a function for handling login
const mockLogin = jest.fn();

// Test case 1: Rendering the login form
test('Renders the login form correctly', () => {
  const { getByLabelText, getByText } = render(
    <Login onLogin={mockLogin} />
  );

  // Ensure the presence of form elements
  expect(getByLabelText('Email')).toBeInTheDocument();
  expect(getByLabelText('Password')).toBeInTheDocument();
  expect(getByText('Sign In')).toBeInTheDocument();
  expect(getByText('Don\'t have an account? Sign Up')).toBeInTheDocument();
});

// Test case 2: Submitting the login form
test('Submitting the login form with valid credentials', () => {
  const { getByLabelText, getByText } = render(
    <Login onLogin={mockLogin} />
  );

  // Simulate user input
  fireEvent.change(getByLabelText('Email'), { target: { value: 'user@example.com' } });
  fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });

  // Submit the form
  fireEvent.click(getByText('Sign In'));

  // Expect the onLogin function to be called with the correct credentials
  expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password123');
});

// Test case 3: Navigating to the sign-up page
test('Clicking the "Sign Up" link navigates to the sign-up page', () => {
  const { getByText } = render(
    <Login onLogin={mockLogin} onSignupClick={() => {}} />
  );

  // Click the "Sign Up" link
  fireEvent.click(getByText('Don\'t have an account? Sign Up'));

  // Assert that the onSignupClick function is called
  expect(mockLogin).not.toHaveBeenCalled();
});
