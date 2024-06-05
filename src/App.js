import React from 'react';
import './App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp.js';
import Login from './components/Login/Login.js';
import Header from './components/Header.js';

function App() {
  return (
    <>
    <Header />
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={< Login />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
