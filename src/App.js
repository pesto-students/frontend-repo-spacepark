import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp.js';
import Login from './components/Login/Login.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={< Login />} />
        {/* <Route path="/booking" element={<Booking />} /> */}
        {/* <Route path="/user-profile" element={<UserProfile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
