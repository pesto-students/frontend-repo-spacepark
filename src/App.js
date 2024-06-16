import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import isAuthenticated from "./helpers/IsAuthenticated.js";
// import Home from "./components/Home";
// import SignUp from "./components/SignUp.js";
// import Login from "./components/Login/Login.js";
import Header from "./components/Header/Header.js";
// import MapComponent from "./components/MapComponent.js";
// import RegisterParkingSpace from "./components/RegisterParkingSpace/RegisterParkingSpace.jsx";
// import TicketScreen from "./components/TicketsScreen/TicketScreen.jsx";
// import AdminDashboard from "./components/AdminDashBoard/AdminDashboard.js";
// import ParkAdmin from "./components/ParkAdmin/ParkAdmin.jsx";
// import UserFormComponent from "./components/AdminDashBoard/FormComponents/UserFormComponent.jsx";
// import ParkingSpacesForm from "./components/AdminDashBoard/FormComponents/ParkingSpacesForm.js";
// import AboutPage from "./components/StaticComponents/AboutUs.jsx";
// import BlogPage from "./components/StaticComponents/BlogPage.jsx";
// import Contact from "./components/Contact/Contact.jsx";
// import Profile from "./components/Profile/Profile.jsx"
import QRCodeDisplay from "./components/QRCodeDisplay/QRCodeDisplay.jsx";
import QRCodeScanner from "./components/QRCodeScanner/QRCodeScanner.jsx";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/display" element={<QRCodeDisplay />} />
          <Route path="/scanner" element={<QRCodeScanner />} />
          {/* <Route path="/" element={<Home />} />
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
            path="/parkingOwner"
            element={isAuthenticated() ? <ParkAdmin /> : <Navigate to="/login" />}
          />
          
          <Route
            path="/admindashboard"
            element={isAuthenticated() ? <AdminDashboard /> : <Navigate to="/login" />}
          />

<Route
            path="/users/:id"
            element={isAuthenticated() ? <UserFormComponent /> : <Navigate to="/login" />}
          />


<Route
            path="/parkingspaces/:id"
            element={isAuthenticated() ? <ParkingSpacesForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/about"
            element={isAuthenticated() ? <AboutPage /> : <Navigate to="/login" />}
          />

<Route
            path="/blog"
            element={isAuthenticated() ? <BlogPage /> : <Navigate to="/login" />}
          />

        <Route
            path="/contact"
            element={isAuthenticated() ? <Contact /> : <Navigate to="/login" />}
          />

        <Route
            path="/profile"
            element={<Profile />}
          /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
