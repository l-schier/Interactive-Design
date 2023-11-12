// App.js
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
