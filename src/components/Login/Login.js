// src/components/SignUp.js
import React from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Logo from "../Logo/Logo";

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  mobile: Yup.string().matches(
    /^[0-9]{10}$/,
    "Mobile number must be 10 digits"
  ),
});

const Login = () => {
  return (
    <div>
      <div className="login-logo">
        <Logo />
      </div>

      <p>Welcome to the Car Parking App</p>

      <div className="form-div">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            mobile: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log("Form data submitted:", values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <Field
                  type="text"
                  name="username"
                  placeholder="Please enter your username"
                />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Please enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <button type="submit">Login</button>
            </Form>
          )}
        </Formik>
      </div>
      <p>
        or{" "}
        <Link to="/signup" className="link">
          <span>Signup</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
