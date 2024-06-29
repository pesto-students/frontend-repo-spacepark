// src/App.js
import React, { lazy, Suspense } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { UserProvider, useUser } from "./context/userContext";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Header from "./components/Header/Header";
import Loader from "./components/QRCodeDisplay/Loader";
const Login = lazy(() => import("./components/Login/Login"));
const MapComponent = lazy(() => import("./components/MapComponent"));
const RegisterParkingSpace = lazy(() =>
  import("./components/RegisterParkingSpace/RegisterParkingSpace")
);
const TicketScreen = lazy(() =>
  import("./components/TicketsScreen/TicketScreen")
);
const AdminDashboard = lazy(() =>
  import("./components/AdminDashBoard/AdminDashboard")
);
const ParkAdmin = lazy(() => import("./components/ParkAdmin/ParkAdmin"));
const UserFormComponent = lazy(() =>
  import("./components/AdminDashBoard/FormComponents/UserFormComponent")
);
const ParkingSpacesForm = lazy(() =>
  import("./components/AdminDashBoard/FormComponents/ParkingSpacesForm")
);
const AboutPage = lazy(() => import("./components/StaticComponents/AboutUs"));
const BlogPage = lazy(() => import("./components/StaticComponents/BlogPage"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const QRCodeDisplay = lazy(() =>
  import("./components/QRCodeDisplay/QRCodeDisplay")
);
const QRCodeScanner = lazy(() =>
  import("./components/QRCodeScanner/QRCodeScanner")
);
const ParkingOwnerScreen = lazy(() =>
  import("./components/QRCodeScanner/ParkingOwnerScreen")
);

const ProtectedRoute = ({ element, roles = [], ...rest }) => {
  const { isAuthenticated, role } = useUser();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length && !roles.includes(role)) {
    console.log(role, "Role");
    switch (role) {
      case "user":
        return <Navigate to="/bookings" replace />;
      case "admin":
        return <Navigate to="/admindashboard" replace />;
      case "parkAdmin":
        return <Navigate to="/parkingOwner" replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  return element;
};

const RestrictedRoute = ({ element, restrictedRoles = [], ...rest }) => {
  const { isAuthenticated, role } = useUser();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (restrictedRoles.includes(role)) {
    switch (role) {
      case "user":
        return <Navigate to="/bookings" replace />;
      case "admin":
        return <Navigate to="/admindashboard" replace />;
      case "parkAdmin":
        return <Navigate to="/parkingOwner" replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  return element;
};

function App() {
  return (
    <React.StrictMode>
      <UserProvider>
        <Router>
          <Header />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/display" element={<QRCodeDisplay />} />
              <Route path="/scanner" element={<QRCodeScanner />} />
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registerspace" element={<RegisterParkingSpace />} />
              <Route
                path="/bookings"
                element={
                  <RestrictedRoute
                    element={<MapComponent />}
                    restrictedRoles={["parkAdmin"]}
                  />
                }
              />
              <Route
                path="/tickets"
                element={
                  <RestrictedRoute
                    element={<TicketScreen />}
                    restrictedRoles={["parkAdmin"]}
                  />
                }
              />
              <Route
                path="/parkingOwner"
                element={
                  <ProtectedRoute
                    element={<ParkAdmin />}
                    roles={["parkAdmin"]}
                  />
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
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
          {/* <Footer /> */}
        </Router>
      </UserProvider>
    </React.StrictMode>
  );
}

export default App;
