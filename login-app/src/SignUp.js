// SignUp.js
import React from 'react';
import SignUpForm from './SignUpForm'; // Adjust the import path based on your project structure

const SignUp = () => {
  return (
    <div style={{ background: '#212529', color: '#EAAC8B', textAlign: 'center' }}>
      <div style={{ background: '#355070', padding: '10px' }}>
        <h2>My Social Media App</h2>
      </div>
      {/* No need for another Router here */}
      <SignUpForm />
    </div>
  );
};

export default SignUp;
