// SignUp.js
import React from 'react';
import SignUpForm from './SignUpForm'; // Adjust the import path based on your project structure

const SignUp = () => {
  return (
    <div style={{ background: '#212529', color: '#EAAC8B', textAlign: 'center', height: '100vh', overflow: 'hidden' }}>
      <div style={{ background: '#355070', padding: '10px' }}>
        <h2 style={{ margin: 0 }}>My Social Media App</h2>
      </div>
      <div style={{ padding: '20px' }}>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
