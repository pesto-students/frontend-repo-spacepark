// src/App.js
import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import MapComponent from "./components/MapComponent";
import RegisterParkingSpace from "./components/RegisterParkingSpace/RegisterParkingSpace";
import TicketScreen from "./components/TicketsScreen/TicketScreen";
import AdminDashboard from "./components/AdminDashBoard/AdminDashboard";
import ParkAdmin from "./components/ParkAdmin/ParkAdmin";
import UserFormComponent from "./components/AdminDashBoard/FormComponents/UserFormComponent";
import ParkingSpacesForm from "./components/AdminDashBoard/FormComponents/ParkingSpacesForm";
import AboutPage from "./components/StaticComponents/AboutUs";
import BlogPage from "./components/StaticComponents/BlogPage";
import Contact from "./components/Contact/Contact";
import Profile from "./components/Profile/Profile";
import QRCodeDisplay from "./components/QRCodeDisplay/QRCodeDisplay";
import QRCodeScanner from "./components/QRCodeScanner/QRCodeScanner";
import { UserProvider, useUser } from "./context/userContext";
import ParkingOwnerScreen from "./components/QRCodeScanner/ParkingOwnerScreen";

const ProtectedRoute = ({ element, roles = [], ...rest }) => {
  const { isAuthenticated, role } = useUser();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  if (roles.length && !roles.includes(role)) {
    return <Navigate to="/bookings" replace />;
  }
  return element;
};

function App() {
  return (
    <React.StrictMode>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/display" element={<QRCodeDisplay />} />
            <Route path="/scanner" element={<QRCodeScanner />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registerspace" element={<RegisterParkingSpace />} />
            <Route
              path="/bookings"
              element={<ProtectedRoute element={<MapComponent />} />}
            />
            <Route path="/tickets" element={<TicketScreen />} />
            <Route
              path="/parkingOwner"
              element={
                <ProtectedRoute element={<ParkAdmin />} roles={["parkAdmin"]} />
              }
            />
            <Route
              path="/admindashboard"
              element={
                <ProtectedRoute
                  element={<AdminDashboard />}
                  roles={["admin"]}
                />
              }
            />
            <Route
              path="/users/:id"
              element={<ProtectedRoute element={<UserFormComponent />} />}
            />
            <Route
              path="/parkingspaces/:id"
              element={<ProtectedRoute element={<ParkingSpacesForm />} />}
            />
            <Route
              path="/activeUsers/:id"
              element={<ProtectedRoute element={<ParkingOwnerScreen />} />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </UserProvider>
    </React.StrictMode>
  );
}

export default App;
