import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import isAuthenticated from "./helpers/IsAuthenticated.js";
import Home from "./components/Home";
import SignUp from "./components/SignUp.js";
import Login from "./components/Login/Login.js";
import Header from "./components/Header/Header.js";
import MapComponent from "./components/MapComponent.js";
import RegisterParkingSpace from "./components/RegisterParkingSpace/RegisterParkingSpace.jsx";
import TicketScreen from "./components/TicketsScreen/TicketScreen.jsx";
import AdminDashboard from "./components/AdminDashBoard/AdminDashboard.js";


function App() {
  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerspace" element={<RegisterParkingSpace />} />
          <Route
          path="/settings"
          element={
            isAuthenticated() ? (
              <MapComponent />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
          <Route
            path="/tickets"
            element={isAuthenticated() ? <TicketScreen /> : <Navigate to="/login" />}
          />
          <Route
            path="/admindashboard"
            element={isAuthenticated() ? <AdminDashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
