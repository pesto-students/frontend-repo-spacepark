// src/components/ErrorPage/ErrorPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./Error.scss"; // Optional, for styling

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default ErrorPage;
