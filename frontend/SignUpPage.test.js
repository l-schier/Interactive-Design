import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpPage from './SignUpPage';

describe('SignUpPage Component', () => {
  it('renders the Signup form', () => {
    const { getByLabelText, getByText } = render(<SignUpPage />);
    
    // Check if the Signup form elements are present
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByText('Already have an account? Log In')).toBeInTheDocument();
  });

  it('allows entering signup information', () => {
    const { getByLabelText } = render(<SignUpPage />);
    const emailInput = getByLabelText('Email');
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpassword' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
    expect(confirmPasswordInput.value).toBe('testpassword');
  });

  it('calls the signup function on form submission', () => {
    const mockSignup = jest.fn();
    const { getByText } = render(<SignUpPage onSignup={mockSignup} />);
    
    const signupButton = getByText('Sign Up');
    fireEvent.click(signupButton);
    
    // Ensure that the signup function is called when the form is submitted
    expect(mockSignup).toHaveBeenCalledTimes(1);
  });
});
