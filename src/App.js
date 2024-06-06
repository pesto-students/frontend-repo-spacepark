import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp.js";
import Login from "./components/Login/Login.js";
import Header from "./components/Header/Header.js";
import Payment from "./components/Payment.js";
import RegisterParkingSpace from "./components/RegisterParkingSpace/RegisterParkingSpace.jsx";
import TicketScreen from "./components/TicketsScreen/TicketScreen.jsx";
//import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/test" element={<RegisterParkingSpace />} />
          <Route path="/tickets" element={<TicketScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
